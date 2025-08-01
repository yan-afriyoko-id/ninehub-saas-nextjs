import { ReactNode } from 'react';

interface RoleBasedContentProps {
  userRole: string;
  adminContent: ReactNode;
  userContent: ReactNode;
  tenantContent: ReactNode;
  fallbackContent?: ReactNode;
}

export default function RoleBasedContent({ 
  userRole, 
  adminContent, 
  userContent, 
  tenantContent, 
  fallbackContent 
}: RoleBasedContentProps) {
  switch (userRole) {
    case 'admin':
      return <>{adminContent}</>;
    case 'user':
      return <>{userContent}</>;
    case 'tenant':
      return <>{tenantContent}</>;
    default:
      return <>{fallbackContent || userContent}</>;
  }
} 