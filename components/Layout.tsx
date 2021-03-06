import { FC } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const Layout: FC = ({ children }) => {
  const t = useTheme();

  return (
    <SafeAreaView>
      <View style={t.ph}>{children}</View>
    </SafeAreaView>
  );
};
