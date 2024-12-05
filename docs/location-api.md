### ScrollView: react-native에서 제공하는 컴포넌트

- 컴포넌트: UI를 구성하는 구성 요소, 컴포넌트는 화면에 시각적으로 표시되는 부분을 담당

### Dimensions: react-native에서 제공하는 API

- API: 특정 기능을 실행하거나 정보를 가져오는 역할을 하는 코드나 메서드, 컴포넌트처럼 화면에 직접 표시 X

### Location: Expo에서 제공하는 Location API

- requestForegroundPermissionsAsync(): 위치 권한을 요청하여 앱 사용중에만 사용자가 위치 정보에 접근할 수 있도록 허용

- getCurrentPositionAsync({ accuracy: 5 }): 사용자의 현재 위치 좌표(위도, 경도)를 가져옵니다. 정확도를 High로 설정

- reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false }): 좌표를 기반으로 주소를 역지오코딩하여 해당 위치의 주소를 반환
- useGoogleMaps: false: 이 옵션은 Google Maps API를 사용하지 않겠다는 설정. true로 설정하면 Google Maps를 사용하여 더 정확한 결과를 얻을 수 있다. Google Maps API는 별도로 API 키를 요구하며, useGoogleMaps: false는 기본적으로 Expo가 제공하는 역지오코딩 서비스를 사용

```javascript
객체 구조 분해 할당을 사용한 경우(ES6 문법)
const { granted } = await Location.requestForegroundPermissionsAsync();

객체 구조 분해 할당을 사용하지 않은 경우
const permission = await Location.requestForegroundPermissionsAsync();
console.log(permission.granted);
```
