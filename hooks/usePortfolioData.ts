
import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { PortfolioItem } from '../types';

export const usePortfolioData = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      setError(new Error("Firebase is not configured. Portfolio data cannot be loaded."));
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const portfolioItems: PortfolioItem[] = [];
      querySnapshot.forEach((doc) => {
        portfolioItems.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setItems(portfolioItems);
      setError(null);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching portfolio data:", err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const groupedItems = items.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as { [key: string]: PortfolioItem[] });

  return { groupedItems, loading, error };
};
