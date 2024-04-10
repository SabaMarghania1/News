import styles from './styles.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

import {useEffect, useState} from 'react';
import {getNews} from '../../api/apiNews';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

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

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton type={'banner'} count={1} />
      )}
      <Pagination totalPages={totalPages} />
      {!isLoading ? <NewsList news={news} /> : <Skeleton type={'item'} count={10} />}
    </main>
  );
};

export default Main;
