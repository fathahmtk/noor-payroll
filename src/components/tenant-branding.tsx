'use client';

import React, { useEffect, useState } from 'react';
import { useTenantBranding } from '@/contexts/tenant-context';

interface TenantBrandingProps {
  children: React.ReactNode;
  className?: string;
}

export function TenantBranding({ children, className = '' }: TenantBrandingProps) {
  const branding = useTenantBranding();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Apply branding styles to the document
  useEffect(() => {
    if (isMounted) {
      const root = document.documentElement;
      
      // Apply CSS custom properties for theming
      root.style.setProperty('--tenant-primary-color', branding.primaryColor);
      root.style.setProperty('--tenant-secondary-color', branding.secondaryColor);
      root.style.setProperty('--tenant-bg-color', branding.backgroundColor);
      root.style.setProperty('--tenant-text-color', branding.textColor);
      
      // Apply background color to body
      document.body.style.backgroundColor = branding.backgroundColor;
      document.body.style.color = branding.textColor;
      
      return () => {
        // Cleanup styles when component unmounts
        root.style.removeProperty('--tenant-primary-color');
        root.style.removeProperty('--tenant-secondary-color');
        root.style.removeProperty('--tenant-bg-color');
        root.style.removeProperty('--tenant-text-color');
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
      };
    }
  }, [branding, isMounted]);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Component for tenant-themed buttons
interface TenantButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function TenantButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false 
}: TenantButtonProps) {
  const branding = useTenantBranding();
  
  const getButtonStyle = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: branding.primaryColor,
        color: '#ffffff',
        border: 'none',
      };
    } else {
      return {
        backgroundColor: 'transparent',
        color: branding.secondaryColor,
        border: `1px solid ${branding.secondaryColor}`,
      };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      style={getButtonStyle()}
    >
      {children}
    </button>
  );
}

// Component for tenant-themed cards
interface TenantCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function TenantCard({ children, className = '', title }: TenantCardProps) {
  const branding = useTenantBranding();

  return (
    <div
      className={`rounded-lg border shadow-sm ${className}`}
      style={{
        backgroundColor: branding.backgroundColor,
        borderColor: branding.primaryColor,
        color: branding.textColor,
      }}
    >
      {title && (
        <div
          className="px-4 py-2 border-b font-semibold"
          style={{
            backgroundColor: branding.primaryColor,
            borderColor: branding.secondaryColor,
            color: '#ffffff',
          }}
        >
          {title}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Component for tenant-themed headers
interface TenantHeaderProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function TenantHeader({ children, className = '', level = 1 }: TenantHeaderProps) {
  const branding = useTenantBranding();

  const getHeaderStyle = () => {
    return {
      color: branding.textColor,
    };
  };

  const getClassName = () => {
    const baseClasses = 'font-bold';
    const sizeClasses = {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    };
    return `${baseClasses} ${sizeClasses[level]} ${className}`;
  };

  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderTag className={getClassName()} style={getHeaderStyle()}>
      {children}
    </HeaderTag>
  );
}

// Component for tenant-themed links
interface TenantLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function TenantLink({ children, href, onClick, className = '' }: TenantLinkProps) {
  const branding = useTenantBranding();

  const linkStyle = {
    color: branding.primaryColor,
    textDecoration: 'none',
  };

  if (href) {
    return (
      <a href={href} className={className} style={linkStyle}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} style={linkStyle}>
      {children}
    </button>
  );
}