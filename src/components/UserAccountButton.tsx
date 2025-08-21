import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/components/AuthProvider';
import { User, LogOut, Settings, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export const UserAccountButton = () => {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  if (loading) {
    return (
      <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative rounded-full p-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2 text-sm">
            <p className="font-medium">{user.user_metadata?.full_name || 'User'}</p>
            <p className="text-muted-foreground text-xs">{user.email || 'No email'}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.location.href = '/meditation'}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Progress Tracker
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/gratitude-garden'}>
            <Settings className="w-4 h-4 mr-2" />
            My Tools
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowAuthModal(true)}
        className="hidden sm:flex"
      >
        <User className="w-4 h-4 mr-2" />
        Sign In
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowAuthModal(true)}
        className="sm:hidden p-2"
      >
        <User className="w-4 h-4" />
      </Button>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};