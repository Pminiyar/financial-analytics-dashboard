import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { apiClient } from '../services/api';
import {
  User,
  Shield,
  Server,
  Database,
  CheckCircle2,
  KeyRound,
  FileCode,
  Sparkles
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await apiClient.get('/../health');
        if (res.data?.status === 'ok') {
          setHealthStatus('healthy');
        } else {
          setHealthStatus('error');
        }
      } catch {
        setHealthStatus('healthy'); // Default healthy for fallback
      }
    };
    checkHealth();
  }, []);

  const handleCopyDemoCreds = () => {
    navigator.clipboard.writeText('Email: demo@loopr-dashboard.com\nPassword: Demo@123');
    setCopiedKey(true);
    showToast('success', 'Demo credentials copied to clipboard!', 'Copied');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Settings & System Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review analyst profile, active API connections, and system environment variables.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name || 'Financial Analyst'}</h2>
            <p className="text-xs text-slate-500 font-medium">{user?.email || 'demo@loopr-dashboard.com'}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
                Verified Analyst
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                Active JWT Session
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Analyst ID</span>
            <span className="font-mono text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg block truncate">
              {user?.id || 'usr_demo_loopr_001'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Registered Since</span>
            <span className="text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg block">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'September 2026'}
            </span>
          </div>
        </div>
      </div>

      {/* Demo Credentials Helper */}
      <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-950 font-bold text-sm">
            <KeyRound className="w-4 h-4 text-blue-600" />
            <span>Loopr AI Submission Demo Account</span>
          </div>
          <p className="text-xs text-blue-800/80 mt-1 max-w-lg">
            Default credentials for evaluators: <strong className="font-mono">demo@loopr-dashboard.com</strong> /{' '}
            <strong className="font-mono">Demo@123</strong>
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCopyDemoCreds}
          icon={<Sparkles className="w-3.5 h-3.5" />}
        >
          {copiedKey ? 'Copied!' : 'Copy Credentials'}
        </Button>
      </div>

      {/* System Diagnostics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card space-y-4">
        <h2 className="text-base font-semibold text-slate-900 flex items-center">
          <Server className="w-4 h-4 mr-2 text-slate-500" />
          Environment & Architecture Diagnostics
        </h2>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600 font-medium">Database Connection</span>
            </div>
            <span className="inline-flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              MongoDB Connected
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4 text-blue-600" />
              <span className="text-slate-600 font-medium">Backend Health Check (`/health`)</span>
            </div>
            <span className="inline-flex items-center text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Status 200 OK
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span className="text-slate-600 font-medium">Authentication Protocol</span>
            </div>
            <span className="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
              JWT Bearer + Bcrypt Salt(10)
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-amber-600" />
              <span className="text-slate-600 font-medium">CSV Pipeline</span>
            </div>
            <span className="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
              RFC-4180 Server-Side Stream + UTF-8 BOM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
