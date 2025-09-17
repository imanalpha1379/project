import { useEffect, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCryptoStore } from '@/stores/crypto';
import { cryptoApi } from '@/services/crypto-api';
import { webSocketService } from '@/services/websocket';
import { CRYPTO_SYMBOLS } from '@/shared/lib/constants';
import { getAssetName } from '@/shared/lib/utils';

export function useCryptoData(): { isLoading: boolean; error: string | null } {
  const {
    assets,
    isLoading,
    error,
    setAssets,
    updateAsset,
    setLoading,
    setError,
    setConnectionStatus,
  } = useCryptoStore();

  // Fetch initial data
  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['crypto', 'all-tickers'],
    queryFn: () => cryptoApi.getAllTickers(),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  // Setup WebSocket connection
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const initializeCryptoData = async () => {
      try {
        const tickers = await cryptoApi.getAllTickers();
        if (mounted && tickers.length > 0) {
          setAssets(tickers);
          setConnectionStatus('connected');
          setLoading(false);
        }
      } catch (error) {
        console.warn('Failed to fetch initial crypto data:', error);
        
        if (mounted) {
          setConnectionStatus('disconnected');
          setLoading(false);
          setError('Failed to connect to live data.');
        }
      }
    };

    const streams = CRYPTO_SYMBOLS.map(symbol => `${symbol.toLowerCase()}@ticker`);
    
    const handleTicker = (ticker: any) => {
      const asset = {
        id: ticker.s.toLowerCase(),
        symbol: ticker.s,
        name: getAssetName(ticker.s),
        price: parseFloat(ticker.c),
        change24h: parseFloat(ticker.c) - parseFloat(ticker.o),
        changePercent24h: parseFloat(ticker.P),
        volume24h: parseFloat(ticker.v),
        high24h: parseFloat(ticker.h),
        low24h: parseFloat(ticker.l),
        lastUpdated: new Date(ticker.E),
      };
      
      updateAsset(asset);
    };

    const handleConnection = (data: any) => {
      setConnectionStatus(data.status);
    };

    webSocketService.on('ticker', handleTicker);
    webSocketService.on('connection', handleConnection);
    webSocketService.connect(streams);

    return () => {
      mounted = false;
      webSocketService.off('ticker', handleTicker);
      webSocketService.off('connection', handleConnection);
      webSocketService.disconnect();
    };
  }, [updateAsset, setConnectionStatus]);

  // Update store when query data changes
  useEffect(() => {
    if (data) {
      setAssets(data);
    }
  }, [data, setAssets]);

  // Update loading and error states
  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  useEffect(() => {
    setError(queryError?.message || null);
  }, [queryError, setError]);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const freshData = await cryptoApi.getAllTickers();
      setAssets(freshData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
      console.warn('Failed to refresh crypto data:', err);
    } finally {
      setLoading(false);
    }
  }, [setAssets, setLoading, setError]);

  return { isLoading, error };
}