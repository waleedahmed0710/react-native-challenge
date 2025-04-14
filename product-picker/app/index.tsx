import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/home" />; //Redirect to home tab, "/(tabs)/home"- enforce type safe routing
}