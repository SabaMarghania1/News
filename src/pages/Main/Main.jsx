import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";

import {useEffect, useState} from "react";
import {getNews} from "../../api/apiNews";

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setIsloading(true);
    const fetchNews = async () => {
      try {
        const response = await getNews();
        setNews(response.news);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton type={"banner"} count={1} />
      )}
      {!isLoading ? <NewsList news={news} /> : <Skeleton type={"item"} count={10} />}
    </main>
  );
};

export default Main;
