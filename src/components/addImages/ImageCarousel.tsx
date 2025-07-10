import { Button, ButtonText, Button as GluestackButton } from '@/components/ui/button';
import { ImagePickerAsset, launchImageLibraryAsync } from 'expo-image-picker';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import {
    View,
    Image,
    Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth } = Dimensions.get('window');

type ImageCarouselType = {
    images: ImagePickerAsset[]
    updateImages: Dispatch<SetStateAction<ImagePickerAsset[]>>
}

function ImageCarousel({ images, updateImages }: ImageCarouselType) {
    const carouselRef = useRef(null);

    const pickImage = async () => {
        let result = await launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });
        if (!result.canceled) {
            updateImages(result.assets)
        }
    };

    const removeImage = (imageUri: string) => {
        updateImages(images.filter((value, index) => value.uri !== imageUri))

        // const response = await fetch(image);
        // const blob = await response.blob();
        // console.log(image);

        // const filename = image.substring(image);
        // const storageRef = ref(firebaseStorage, `images/${filename}`);

        // const snapshot = await uploadBytes(storageRef, blob);
        // console.log('Image uploaded successfully!');

        // const url = await getDownloadURL(snapshot.ref);
        // console.log('++++++++', url, '+++++++++');
    }

    const renderCarouselItem = ({ item, index }: { item: ImagePickerAsset, index: number }) => {
        return (
            <View
                key={`${item.fileName}-${index}`}
                className={`bg-white rounded-lg p-3 w-full h-[40vh] items-center justify-center shadow-md`}
            >
                <Image className='w-full h-full rounded-lg' source={{ uri: item.uri }} />
                <Button className='absolute bottom-10 right-10'
                    onPress={(() => removeImage(item.uri))}
                >
                    <ButtonText>
                        <FontAwesome name='trash' size={20} color={"error"} />
                    </ButtonText>
                </Button>
            </View>
        );
    };

    return (
        <View >
            {images.length > 0 ? (
                <Carousel
                    ref={carouselRef}
                    data={images}
                    renderItem={renderCarouselItem}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth * 0.8} // Adjust item width as needed
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.7}
                    enableSnap={true}
                    loop={true} // Set to true if you want looping
                    layout={'default'} // You can try 'stack' or 'tinder' for different layouts
                />
            ) : (
                <GluestackButton onPress={pickImage} className="mx-20 rounded-lg bg-white border-2 border-primaryGreen" size="lg" variant="outline">
                    <FontAwesome name='upload' size={20} color={"#14905C"} />
                    <ButtonText className="color-primaryGreen font-helvetica">Add photos</ButtonText>
                </GluestackButton>
            )}
        </View>
    );
}

export default ImageCarousel;