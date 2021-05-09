import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    alignItems: "center",
  },
  firstHeader: {
    marginBottom: SIZES.padding,
    color: 'black',
    fontSize: SIZES.largeTitle,
    marginTop: SIZES.padding * 4,
  },
  logo: {
    width: 60,
    height: 60,
  },
  signUp: {
    marginTop: SIZES.padding * 5,
    color: 'black',
    fontSize: SIZES.h1,
  },
  textInputStyle: {
    marginVertical: SIZES.padding,
    
    borderBottomWidth: 1,
    height: 40,
    
    ...FONTS.body3,
  },
  button: {
    position: "absolute",
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  },
  view: { marginTop: SIZES.padding * 2 },
  label: { ...FONTS.body3 },
  outsideView: {
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding * 3,
  },
  signInLink: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  textP: { alignSelf: "flex-end", ...FONTS.h4 },
  submitButton: {
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding * 5,
  },
  buttonText: { color: COLORS.white, ...FONTS.h3 }
})


