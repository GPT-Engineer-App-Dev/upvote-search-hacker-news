export const fetchTopStories = async () => {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const data = await response.json();
  return data.slice(0, 100);
};

export const fetchStoryDetails = async (id) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const data = await response.json();
  return data;
};