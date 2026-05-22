"use client";

import { useEffect, useMemo, useState } from "react";

import { BlogList } from "@/components/BlogList";
import { CategoryFilters } from "@/components/CategoryFilters";
import { GridSkeleton } from "@/components/Skeletons";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { fetchBlogs } from "@/services/blogs";
import { useDebounce } from "@/hooks/useDebounce";
import { sampleBlogs } from "@/data/sampleBlogs";
import type { Blog } from "@/types";

export function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const debounced = useDebounce(query, 500);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs({
          page,
          limit: 6,
          q: debounced || undefined,
          category: category === "All" ? undefined : category
        });
        setBlogs(data.items);
        setTotal(data.total);
      } catch (error) {
        setBlogs(sampleBlogs);
        setTotal(sampleBlogs.length);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [debounced, category, page]);

  useEffect(() => {
    setPage(1);
  }, [debounced, category]);

  const filtered = useMemo(() => {
    if (blogs.length) return blogs;
    return sampleBlogs;
  }, [blogs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilters value={category} onChange={setCategory} />
      </div>
      {loading ? <GridSkeleton /> : <BlogList blogs={filtered} />}
      <Pagination page={page} total={total} limit={6} onChange={setPage} />
    </div>
  );
}
