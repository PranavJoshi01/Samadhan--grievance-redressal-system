import { useState, useEffect, useCallback } from 'react';
import { fetchGrievancesWithFilters, fetchGrievanceStats } from '../services/grievanceService';

/**
 * Hook to fetch grievances with pagination
 */
export const useGrievances = (page = 0, size = 10, status = '') => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadGrievances = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGrievancesWithFilters({
        page: currentPage,
        size: size,
        status: status || undefined, // Only send status if it's not empty
      });
      setGrievances(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError(err.message);
      setGrievances([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, size, status]);

  useEffect(() => {
    loadGrievances();
  }, [loadGrievances]);

  return {
    grievances,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    pageSize: size,
    goToPage: setCurrentPage,
    refetch: loadGrievances,
  };
};

/**
 * Hook to fetch grievance statistics
 */
export const useGrievanceStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGrievanceStats();
      setStats(response);
    } catch (err) {
      setError(err.message);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loading, error, refetch: loadStats };
};
