import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTopStories, fetchStoryDetails } from "@/utils/api";

function Index() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: storyIds, isLoading: isLoadingIds } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

  const { data: stories, isLoading: isLoadingStories } = useQuery({
    queryKey: ["stories", storyIds],
    queryFn: () => Promise.all(storyIds.map(fetchStoryDetails)),
    enabled: !!storyIds,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Input
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoadingIds || isLoadingStories ? (
        <Skeleton className="w-full h-10" count={10} />
      ) : (
        filteredStories?.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Upvotes: {story.score}</p>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}

export default Index;
