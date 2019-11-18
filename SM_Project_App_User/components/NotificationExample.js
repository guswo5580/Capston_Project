import React from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const Cancle = () => {
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.mainContentText}>신고를 취소하였습니다.</Text>
        <Text style={styles.mainContentDate}>2019/10/28/18:26</Text>
      </View>
      <View style={styles.mainNavigation}>
        <TouchableOpacity style={styles.navigationBtn} onPress={() => {}}>
          <Text style={styles.BtnText}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Declare_manual = () => {
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.mainContentText}>수동 신고를 접수하였습니다.</Text>
        <Text style={styles.mainContentDate}>2019/10/28/18:26</Text>
      </View>
      <View style={styles.mainNavigation}>
        <TouchableOpacity style={styles.navigationBtn} onPress={() => {}}>
          <Text style={styles.BtnText}>신원 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const Declare_automatic = () => {
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.mainContentText}>자동 신고를 접수하였습니다.</Text>
        <Text style={styles.mainContentDate}>2019/10/28/18:26</Text>
      </View>
      <View style={styles.mainNavigation}>
        <TouchableOpacity style={styles.navigationBtn} onPress={() => {}}>
          <Text style={styles.BtnText}>신원 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Notification = () => {
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.mainContentText}>
          경찰관 출동 배정이 완료되었습니다.
        </Text>
        <Text style={styles.mainContentDate}>2019/10/28/18:26</Text>
      </View>
      <View style={styles.mainNavigation}>
        <TouchableOpacity style={styles.navigationBtn} onPress={() => {}}>
          <Text style={styles.BtnText}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 100,
    marginHorizontal: 20,
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 2,
    alignItems: "center"
  },
  mainContent: {
    flex: 3,
    flexDirection: "column"
  },
  mainNavigation: {
    flex: 1
  },
  mainContentText: {
    fontSize: 13,
    fontWeight: "bold"
  },
  mainContentDate: {
    fontSize: 11,
    color: "gray"
  },
  navigationBtn: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    justifyContent: "center"
  },
  BtnText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  }
});
