import {
	EvilIcons,
	FontAwesome6,
	AntDesign,
	Fontisto,
	MaterialIcons,
	MaterialCommunityIcons,
	Ionicons,
	Entypo,
	FontAwesome,
	Feather,
	FontAwesome5,
} from '@expo/vector-icons';

export const getIconComponent = (iconType: string) => {
	switch (iconType) {
		case 'EvilIcons':
			return EvilIcons;
		case 'Feather':
			return Feather;
		case 'MaterialCommunityIcons':
			return MaterialCommunityIcons;
		case 'Ionicons':
			return Ionicons;
		case 'Entypo':
			return Entypo;
		case 'FontAwesome':
			return FontAwesome;
		case 'FontAwesome6':
			return FontAwesome6;
		case 'AntDesign':
			return AntDesign;
		case 'Fontisto':
			return Fontisto;
		case 'MaterialIcons':
			return MaterialIcons;
		case 'FontAwesome5':
			return FontAwesome5;
		default:
			return FontAwesome6;
	}
};


// const data = [mobile: '<Entypo name="mobile" size={24} color="black" />', bill : '<MaterialCommunityIcons name="cash" size={24} color="black" />' , electricity: '<MaterialIcons name="electric-bolt" size={24} color="black" />'
// const getTransactionIcon = (type) => {
// 	switch(type) {
// 		case 'mobile':
// 			return <Entypo name="mobile" size={24} color="black" />;
// 		case 'bill':
// 			return <MaterialCommunityIcons name="cash" size={24} color="black" />;
// 		case 'electricity':
// 			return <MaterialIcons name="electric-bolt" size={24} color="black" />;
// 		default:
// 			return <FontAwesome6 name={type === 'transfer' ? "arrow-right-arrow-left" : "money-bill-transfer"} size={24} color="black" />;
// 	}
// };