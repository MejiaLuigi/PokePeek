import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainStackParamList = {
    Home: undefined;
    Search: undefined;
    Details: { name: string, url: string}
}

export type MainStackScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList,T>;
