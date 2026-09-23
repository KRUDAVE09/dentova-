import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Card } from '../components/ui/Card';
import { ROUTES } from '../constants/routes';
import { Stethoscope, Lock, Mail, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('dr.jenkins@dentovasuites.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-[#100vh] min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative Warm Soft Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0F766E]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#17201E] text-[#5EEAD4] flex items-center justify-center shadow-lg border border-stone-800">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">DENTOVA</h1>
            <p className="text-xs font-semibold text-[#0F766E] uppercase tracking-widest mt-0.5">
              Dental Clinic Management SaaS
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <Card className="p-6 sm:p-8 shadow-xl border-stone-200/80">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-stone-900">Sign in to Practice Suite</h2>
            <p className="text-xs text-stone-500 mt-1">
              Multi-Chair Foundation Access • Development Preview
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="doctor@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <Checkbox
                label="Remember device"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="font-medium text-[#0F766E] hover:underline"
              >
                Reset password?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
              Enter Dashboard Preview
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>HIPAA Compliant UI Shell • Safe Local Sandbox</span>
          </div>
        </Card>

        <p className="text-center text-xs text-stone-500">
          Dentova SaaS Foundation v1.0.0 • No live credentials required.
        </p>
      </div>
    </div>
  );
};
