import axios from 'axios';
import { type SearchResult } from '../types/map.types';
import { MAP_SEARCH_API_URL } from '../constants/map.constants';

export const searchPlaces = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get<SearchResult[]>(MAP_SEARCH_API_URL, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 8, 
        countrycodes: 'vn', 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi tìm kiếm:", error);
    return [];
  }
};