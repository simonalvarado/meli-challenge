import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { fetchItems } from "../../services/dataService.js";
import { SearchContext } from "../../context/SearchContext.js";
import "./ItemList.scss";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { searchQuery } = useContext(SearchContext);

  const observer = useRef();
  
  const lastItemElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const loadItems = useCallback(
    async (currentPage, resetItems = false) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        const newItems = await fetchItems({
          page: currentPage,
          perPage,
          query: searchQuery,
        });
        console.log("query:", searchQuery, "page:", currentPage);

        if (newItems.length < perPage) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

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
    [perPage, searchQuery]
  );

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
      <h1>Item List</h1>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastItemElementRef : null}
            className="item-list__item"
          >
            {item.title}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasMore && items.length > 0 && <p>No more items to load</p>}
    </div>
  );
};

export default ItemList;
