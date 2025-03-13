import { useState, useEffect } from 'react';
import { Session } from './session';
import { Account, SubAccount } from './account';

export const useAccount = () => {
  const [account, setAccount] = useState<Account>();
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([]);
  const [sessions, setSessions] = useState<Session[]>([new Session()]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    // setIsLoading(false);
  }, []);

  return {account, subAccounts, sessions, isLoading, isAuthenticated};
}
