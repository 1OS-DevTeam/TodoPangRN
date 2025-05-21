import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, forwardRef } from 'react';
import { Text } from 'react-native';
import { COLORS } from '@/assets/colors/colors';

interface TwoButtonBottomSheetProps {
  title: string;
  message: string;
  firstButtonLabel: string;
  firstButtonEvent: () => void;
  secondButtonLabel: string;
  secondButtonEvent: () => void;
}

const TwoButtonBottomSheet = forwardRef<BottomSheet, TwoButtonBottomSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.message}>{props.message}</Text>
        </View>
        <View style={styles.imageSection}>
          <Image source={require('@/assets/images/mywish/wish_complete.png')} style={styles.image} />
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonSection}>
            <TouchableOpacity onPress={props.firstButtonEvent} style={{ flex: 1 }}>
              <View style={styles.firstButton}>
                <Text style={styles.firstButtonText}>{props.firstButtonLabel}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.secondButtonEvent} style={{ flex: 1 }}>    
              <View style={styles.secondButton}>
                <Text style={styles.secondButtonText}>{props.secondButtonLabel}</Text>
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
    paddingBottom: 16,
  },
  messageBox: {
    width: '100%',
    paddingTop: 16,
  },
  imageSection: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: COLORS.mainPurple,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.darkGrey,
    paddingTop: 12,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 'auto',
  },
  buttonSection: {
    flexDirection: 'row',
    gap: 16,
    height: 48,
    width: '100%',
  },
  firstButton: {
    flex: 1,
    backgroundColor: 'rgba(99, 95, 199, 0.2)',
    borderRadius: 6,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondButton: {
    flex: 1,
    backgroundColor: COLORS.mainPurple,
    borderRadius: 6,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  firstButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.mainPurple,
  },
  secondButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default TwoButtonBottomSheet;