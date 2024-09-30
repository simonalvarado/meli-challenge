import React, { useState, useEffect, useCallback, useContext } from "react";
import { fetchItems } from "../../services/dataService.js";
import { SearchContext } from "../../context/SearchContext.js";
import Card from "../Card/Card.js";
import useIntersectionObserver from "../../hooks/useIntersectionObserver.js";
import "./ItemList.scss";

const ITEMS_PER_PAGE = 10;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { searchQuery } = useContext(SearchContext);

  const loadItems = useCallback(
    async (currentPage, resetItems = false) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        const newItems = await fetchItems({
          page: currentPage,
          perPage: ITEMS_PER_PAGE,
          query: searchQuery,
        });
        console.log("query:", searchQuery, "page:", currentPage);

        setHasMore(newItems.length === ITEMS_PER_PAGE);
        setItems((prevItems) =>
          resetItems ? newItems : [...prevItems, ...newItems]
        );
      } catch (error) {
        setError("Failed to load items. Please try again later.");
        console.error("Error loading items:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery]
  );

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const lastItemRef = useIntersectionObserver(isLoading, hasMore, loadMore);

  useEffect(() => {
    setPage(1);
    setItems([]);
    loadItems(1, true);
  }, [searchQuery, loadItems]);

  useEffect(() => {
    if (page > 1) {
      loadItems(page);
    }
  }, [page, loadItems]);

  return (
    <div className="item-list">
      <ul>
        {items.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            ref={index === items.length - 1 ? lastItemRef : null}
          />
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ItemList;
