import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dummy product list
const products = [
  { id: '1', name: 'Office Wear', description: 'Stylish office attire', price: 120, image: require('./src/assets/dress1.png') },
  { id: '2', name: 'Black Dress', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress4.png') },
  { id: '5', name: '21WN', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress6.png') },
  { id: '7', name: '21WN', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress7.png') },
  { id: '8', name: 'Lame', description: 'Reversible angora cardigan', price: 120, image: require('./src/assets/dress3.png') },
];

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };

    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image style={styles.smallImage} source={require('./src/assets/Menu.png')} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image style={styles.smallImage} source={require('./src/assets/Logo.png')} />
          <Image style={styles.smallImage} source={require('./src/assets/Search.png')} />
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Image style={styles.smallImage} source={require('./src/assets/shoppingBag.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.title}>OUR STORY</Text>
        <View style={styles.storyImagesContainer}>
          <Image style={styles.smallImage} source={require('./src/assets/Filter.png')} />
          <Image style={styles.smallImage} source={require('./src/assets/Listview.png')} />
        </View>
      </View>
      <View style={styles.productGrid}>
        {products.map((product, index) => (
          index % 2 === 0 && (
            <View key={product.id} style={styles.productPair}>
              <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('ProductDetailScreen', { product })}>
                <View style={styles.productTop}>
                  <Image style={styles.largeImage} source={product.image} />
                  <TouchableOpacity onPress={() => addToCart(product)}>
                    <Image style={styles.addCircleImage} source={require('./src/assets/add_circle.png')} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.description, styles.textColor1]}>{product.name}</Text>
                <Text style={[styles.description, styles.textColor2]}>{product.description}</Text>
                <Text style={[styles.description, styles.textColor3]}>${product.price}</Text>
              </TouchableOpacity>
              {products[index + 1] && (
                <TouchableOpacity key={products[index + 1].id} style={styles.product} onPress={() => navigation.navigate('ProductDetailScreen', { product: products[index + 1] })}>
                  <View style={styles.productTop}>
                    <Image style={styles.largeImage} source={products[index + 1].image} />
                    <TouchableOpacity onPress={() => addToCart(products[index + 1])}>
                      <Image style={styles.addCircleImage} source={require('./src/assets/add_circle.png')} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.description, styles.textColor1]}>{products[index + 1].name}</Text>
                  <Text style={[styles.description, styles.textColor2]}>{products[index + 1].description}</Text>
                  <Text style={[styles.description, styles.textColor3]}>${products[index + 1].price}</Text>
                </TouchableOpacity>
              )}
            </View>
          )
        ))}
      </View>
    </ScrollView>
  );
};

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.smallImage} source={require('./src/assets/Menu.png')} />
        <View style={styles.headerRight}>
          <Image style={styles.smallImage} source={require('./src/assets/Logo.png')} />
          <Image style={styles.smallImage} source={require('./src/assets/Search.png')} />
          <Image style={styles.smallImage} source={require('./src/assets/shoppingBag.png')} />
        </View>
      </View>
      <Image style={styles.largeImage} source={product.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={[styles.description, styles.textColor2]}>{product.description}</Text>
      <Text style={[styles.description, styles.textColor3]}>${product.price}</Text>
      <Text style={styles.title}>MATERIALS</Text>
      <Text style={[styles.description, styles.textColor2]}>We work with monitoring programmes to
ensure compliance with safety, health and
quality standards for our products.</Text>
      <View style={styles.materialContainer}>
        <View style={styles.materialItem}>
          <Image style={styles.smallImage} source={require('./src/assets/Do Not Bleach.png')} />
          <Text style={styles.materialText}>Do Not Bleach</Text>
        </View>
        <View style={styles.materialItem}>
          <Image style={styles.smallImage} source={require('./src/assets/Do Not Tumble Dry.png')} />
          <Text style={styles.materialText}>Do Not Tumble Dry</Text>
        </View>
        <View style={styles.materialItem}>
          <Image style={styles.smallImage} source={require('./src/assets/Do Not Wash.png')} />
          <Text style={styles.materialText}>Do Not Wash</Text>
        </View>
        <View style={styles.materialItem}>
          <Image style={styles.smallImage} source={require('./src/assets/Iron Low Temperature.png')} />
          <Text style={styles.materialText}>Iron Low Temperature</Text>
        </View>
        <View style={styles.materialItem}>
          <Image style={styles.smallImage} source={require('./src/assets/Door to Door Delivery.png')} />
          <Text style={styles.materialText}>Door to Door Delivery</Text>
        </View>
      </View>
      <Button title="Add to Cart" onPress={() => navigation.navigate('CartScreen')} />
    </ScrollView>
  );
};

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.smallImage2} source={require('./src/assets/Logo.png')} />
        <View style={styles.headerRight}>
          <Image style={styles.smallImage2} source={require('./src/assets/Search.png')} />
        </View>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image style={styles.largeImage} source={item.image} />
            <View style={styles.cartItemDescription}>
              <Text style={[styles.description, styles.textColor1]}>{item.name}</Text>
              <Text style={[styles.description, styles.textColor2]}>{item.description}</Text>
              <Text style={[styles.description, styles.textColor3]}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(products[index + 1])}>
                      <Image style={[styles.removeImage, styles.imageColor3]} source={require('./src/assets/remove.png')} />
                    </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={[styles.description, styles.textColor2]}>EST. TOTAL</Text>
      <Text style={[styles.description, styles.textColor3]}>${cart.reduce((total, item) => total + item.price, 0)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const DrawerContent = ({ navigation }) => (
  <ScrollView style={styles.drawerContainer}>
    <Image style={styles.drawerImage} source={require('./src/assets/Close.png')} />
    <Text style={styles.drawerText}>ERIC ATSU</Text>
    <Text style={styles.drawerText}>Store</Text>
    <Text style={styles.drawerText}>Locations</Text>
    <Text style={styles.drawerText}>Blog</Text>
    <Text style={styles.drawerText}>Jewelry</Text>
    <Text style={styles.drawerText}>Electronic</Text>
    <Text style={styles.drawerText}>Clothing</Text>
  </ScrollView>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Cart" component={CartScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Checkout' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  storyImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'column',
  },
  productPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  product: {
    flex: 1,
    marginBottom: 24,
  },
  productTop: {
    position: 'relative',
  },
  largeImage: {
    justifyContent: 'space-between',
    width: 200,
    height: 300,
  },
  smallImage: {
    width: 50,
    height: 50,
    marginRight: 50,
  },
  addCircleImage: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
  },
  description: {
    marginTop: 8,
  },
  textColor1: {
    color: 'black',
  },
  textColor2: {
    color: 'grey',
  },
  textColor3: {
    color: 'red',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cartItemDescription: {
    flex: 1,
    marginLeft: 16,
  },
  drawerContainer: {
    flex: 1,
    padding: 16,
  },
  drawerImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  drawerText: {
    fontSize: 18,
    marginBottom: 16,
  },
  materialContainer: {
    flexDirection: 'column',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  materialText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default App;