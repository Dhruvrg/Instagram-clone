import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {Dimensions, View} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../config/firebase';
import ReelCard from '../components/reels/ReelCard';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import useShowNavbarContent from '../hooks/showNavbarContent';

const Reels = ({route}: any) => {
  const {id}: any = route.params;
  const [allReels, setAllReels] = useState<ReelCardProps[] | any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const height = Dimensions.get('window').height;
  const showNavbarContent = useShowNavbarContent();

  const handleChangeIndexValue = ({index}: any) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const getReels = async () => {
      try {
        const temp: any = [];
        const data = await getDocs(collection(db, 'reel'));
        data.docs.forEach(doc => temp.push({data: doc.data(), id: doc.id}));
        temp.sort(() => Math.random() - 0.5);
        temp.sort((x: any, y: any) => (x.id == id ? -1 : y.id == id ? 1 : 0));
        setAllReels(temp);
      } catch (error) {}
    };
    getReels();
  }, [id]);

  return (
    <View style={tw`bg-[#000000] h-[${height}px]`}>
      <SwiperFlatList
        onScroll={showNavbarContent.logIn}
        vertical
        data={allReels}
        onChangeIndex={handleChangeIndexValue}
        renderItem={({item, index}) => (
          <ReelCard
            data={item.data}
            id={item.id}
            index={index}
            currentIndex={currentIndex}
          />
        )}
      />
    </View>
  );
};

export default Reels;
