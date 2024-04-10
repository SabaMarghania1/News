import styles from './styles.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

import {useEffect, useState} from 'react';
import {getNews} from '../../api/apiNews';
import Pagination from '../../components/Pagination/Pagination';

import {getCategories} from '../../api/apiNews';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const totalPages = 10;
  const pageSize = 10;

  // Fetch data in general
  const fetchNews = async currentPage => {
    try {
      setIsloading(true);
      const response = await getNews(currentPage, pageSize);

      setNews(response.news);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //  fetch data by categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(['All', ...response.categories]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory]);

  // Event Handlers for moving form page to page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton type={'banner'} count={1} />
      )}
      {/* Pagination with arguments */}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {!isLoading ? <NewsList news={news} /> : <Skeleton type={'item'} count={10} />}

      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Main;
