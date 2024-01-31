import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function Map() {
  // const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<any>(null);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
    });
  }, []);

  const search = async () => {
    try {
      const response = await axios.get(
        "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
        {
          params: {
            radius: "800",
            lon: location.coords.longitude,
            lat: location.coords.latitude,
            kinds: "interesting_places",
          },
          headers: {
            "X-RapidAPI-Key":
              "fda9945fc6msh3d38c07c56e6013p18429ajsn21c639670159",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
          },
        }
      );
      setData(response.data.features);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(data1);

  const info = async () => {
    // const response1 = await axios.get(
    //   `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${ids}`,
    //   {
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "fda9945fc6msh3d38c07c56e6013p18429ajsn21c639670159",
    //       "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    //     },
    //   }
    // );
    // setData1(response1);
    // data1.map((el: any) => {
    //   console.log(el[1]);
    // });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{ width: "100%", height: "80%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {data.map((el: any) => {
            return (
              <Marker
                key={el.id}
                coordinate={{
                  latitude: el.geometry.coordinates[1],
                  longitude: el.geometry.coordinates[0],
                }}
                title="place"
                description="my position"
                onPress={() => info(el.id)}
              />
            );
          })}
        </MapView>
      )}

      <Button title="search" onPress={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
