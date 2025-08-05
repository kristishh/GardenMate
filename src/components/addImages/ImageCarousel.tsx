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
            mediaTypes: ['images'],
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
    }

    const renderCarouselItem = ({ item, index }: { item: ImagePickerAsset, index: number }) => {
        return (
            <View
                key={`${item.fileName}-${index}`}
                className={`bg-white rounded-lg p-3 w-full h-[30vh] items-center justify-center shadow-md`}
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
        <View className='items-center'>
            {images.length > 0 ? (
                <Carousel
                    ref={carouselRef}
                    data={images}
                    renderItem={renderCarouselItem}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth * 0.8}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.7}
                    enableSnap={true}
                    loop={false}
                    layout={'default'}
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