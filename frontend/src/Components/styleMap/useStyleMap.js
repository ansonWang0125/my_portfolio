export default function useStyleMap() {
    const fontFamilyStyleMap = {
        微軟正黑體: { fontFamily: 'Microsoft JhengHei'},
        新細明體: { fontFamily: 'PMingLiu'},
    };
    const fontSizeStyleMap = {
        8: {fontSize: 8},
        9: {fontSize: 9},
        10: {fontSize: 10},
        11: {fontSize: 11},
        12: {fontSize: 12},
        14: {fontSize: 14},
        16: {fontSize: 16},
        18: {fontSize: 18},
        24: {fontSize: 24},
        30: {fontSize: 30},
        36: {fontSize: 36},
        40: {fontSize: 40},
    };

    const customStyleMap ={
        ...fontFamilyStyleMap,
        ...fontSizeStyleMap,
    };

    return { fontFamilyStyleMap, fontSizeStyleMap, customStyleMap}
}