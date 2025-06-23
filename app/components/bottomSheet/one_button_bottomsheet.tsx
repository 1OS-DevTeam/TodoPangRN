import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, ImageStyle, TextStyle } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, forwardRef } from 'react';
import { Text } from 'react-native';
import { COLORS } from '@/assets/colors/colors';
import Typography from '../texts/typhography';

interface OneButtonBottomSheetProps {
  message: string;
  buttonLabel: string;
  buttonEvent: () => void;
  imageSource?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  messageStyle?: TextStyle;
  buttonStyle?: any;
  buttonTextStyle?: TextStyle;
}

const OneButtonBottomSheet = forwardRef<BottomSheet, OneButtonBottomSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.messageBox}>
          <Typography mode='SubHead' color='mainPurple' style={styles.messageText}>{props.message}</Typography>
        </View>
        {props.imageSource && (
          <View style={styles.imageSection}>
            <Image source={props.imageSource} style={[styles.image, props.imageStyle]} />
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonSection}>
            <TouchableOpacity onPress={props.buttonEvent} style={styles.buttonContainer}>
              <View style={[styles.button, props.buttonStyle]}>
                <Text style={[styles.buttonText, props.buttonTextStyle]}>{props.buttonLabel}</Text>
              </View>
            </TouchableOpacity>
          </View>     
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  messageBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  messageText: {
    textAlign: 'center',
  },
  imageSection: {
    paddingTop: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {

  },
  message: {
    paddingTop: 12,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 'auto',
  },
  buttonSection: {
    height: 48,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.mainPurple,
    borderRadius: 6,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default OneButtonBottomSheet; 