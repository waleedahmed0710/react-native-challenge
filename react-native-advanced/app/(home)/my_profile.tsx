import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import styles from "../styles";
import TextInputField from "@/components/ui/TextInputField/intex";
import { useEffect, useState } from "react";
import { clientRequest } from "@/services/clientRequest";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
export default function profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchprofile = async () => {
      setLoading(true);
      const response = await clientRequest("users/2");
      if (response.error !== null) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setProfile(response.data);
    };
    fetchprofile();
  }, []);
  const handleChangeText = (text: string, fieldPath: string) => {
    if (!profile) return;
    setProfile((prev) => ({ ...(prev as Profile), [fieldPath]: text }));
  };
  const handleChangeAddress = (text: string, fieldPath: string) => {
    if (!profile) return;
    setProfile((prev) => {
      if (!prev) return null;
      return { ...prev, address: { ...prev.address, [fieldPath]: text } };
    });
  };
  const handleChangeGeo = (text: string, fieldPath: string) => {
    if (!profile) return;
    setProfile((prev) => {
        if (!prev) return null;
    
        return {
          ...prev,
          address: {
            ...prev.address,
            geo: {
              ...prev.address.geo,
              [fieldPath]: text,
            },
          },
        };
      });
  }
  const handleEdit = async () => {
    setLoading(true);
    const response = await clientRequest("users/2", "PATCH", profile);
    if (response.error !== null) {
        setLoading(false)
        return;
    }
    setLoading(false);
    Alert.alert("Profile Updated", "Your profile has been updated successfully.", [
        { text: "OK", onPress: () => console.log("Profile saved") },]);
    return;
  } 
  return (
    <SafeAreaView style={styles.myProfileContainer}>
      <Loader visible={loading} />
      {!loading && (
        <ScrollView>
          <Text style={styles.textInfo}>Personal</Text>
          <View style={styles.formControl}>
            <Text style={styles.label}>Name: </Text>
            <TextInputField
              value={profile?.name || ""}
              onChangeText={(text) => handleChangeText(text, "name")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Email: </Text>
            <TextInputField
              value={profile?.email || ""}
              onChangeText={(text) => handleChangeText(text, "email")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Phone: </Text>
            <TextInputField
              value={profile?.phone || ""}
              onChangeText={(text) => handleChangeText(text, "phone")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Website: </Text>
            <TextInputField
              value={profile?.website || ""}
              onChangeText={(text) => handleChangeText(text, "website")}
            />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.textInfo}>Address</Text>
          <View style={styles.formControl}>
            <Text style={styles.label}>Street: </Text>
            <TextInputField
              value={profile?.address?.street || ""}
              onChangeText={(text) => handleChangeAddress(text, "street")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Suite: </Text>
            <TextInputField
              value={profile?.address?.suite || ""}
              onChangeText={(text) => handleChangeAddress(text, "suite")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>City: </Text>
            <TextInputField
              value={profile?.address?.city || ""}
              onChangeText={(text) => handleChangeAddress(text, "city")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Zip Code: </Text>
            <TextInputField
              value={profile?.address?.zipcode || ""}
              onChangeText={(text) => handleChangeAddress(text, "zipcode")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Lat: </Text>
            <TextInputField
              value={profile?.address?.geo?.lat || ""}
              onChangeText={(text) => handleChangeGeo(text, "lat")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Long: </Text>
            <TextInputField
              value={profile?.address?.geo?.lng || ""}
              onChangeText={(text) => handleChangeGeo(text, "lng")}
            />
          </View>
          <View style={styles.formControl}>
            <Button title="Edit" onPress={handleEdit} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
