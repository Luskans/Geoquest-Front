import { View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/common/ParallaxScrollView';
import { Link, router } from 'expo-router';
import SectionLink from '@/components/common/SectionLink';
import ModuleLink from '@/components/common/ModuleLink';
import Leaderboard from '@/components/homeScreen/Leaderboard';
import ActiveGameCard from '@/components/homeScreen/ActiveGameCard';


import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';




export default function HomeScreen() {

  // Exemples de données ppur le leadeboard
  const weeklyData = [
    {
      id: '1',
      rank: 1,
      username: 'John Doe',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1250,
    },
    {
      id: '2',
      rank: 2,
      username: 'Hasan',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1240,
    },
    {
      id: '3',
      rank: 3,
      username: 'Jeremy',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1230,
    },
    {
      id: '4',
      rank: 4,
      username: 'Sylvain sdjuhnsquhjn sujhdiuhsq hsqj hqj sqoijhd',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1220,
    },
  ];

  const monthlyData = [
    {
      id: '1',
      rank: 1,
      username: 'John Doe',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1850,
    },
    {
      id: '2',
      rank: 2,
      username: 'Hasan',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1840,
    },
    {
      id: '3',
      rank: 3,
      username: 'Jeremy',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1830,
    },
    {
      id: '4',
      rank: 4,
      username: 'Sylvain',
      profilePic: 'https://example.com/pic1.jpg',
      score: 1820,
    },
  ];

  const totalData = [
    {
      id: '1',
      rank: 1,
      username: 'John Doe',
      profilePic: 'https://example.com/pic1.jpg',
      score: 2150,
    },
    {
      id: '2',
      rank: 2,
      username: 'Hasan',
      profilePic: 'https://example.com/pic1.jpg',
      score: 2140,
    },
    {
      id: '3',
      rank: 3,
      username: 'Jeremy',
      profilePic: 'https://example.com/pic1.jpg',
      score: 2130,
    },
    {
      id: '4',
      rank: 4,
      username: 'Sylvain',
      profilePic: 'https://example.com/pic1.jpg',
      score: 2120,
    },
  ];

  
  return (
    <ParallaxScrollView
      headerBackground={require('@/assets/images/background.webp')}
    >
      <View className='p-6 pb-20 bg-transparent gap-12'>
        {/* NOTIFICATIONS */}
        <View className='flex gap-2'>
          <Link href="/home/notifications" asChild>
            <TouchableOpacity>
              <SectionLink title="Notifications" />
            </TouchableOpacity>
          </Link>
          <Text className='dark:text-light text-lg'>Vous avez x notifications en attente.</Text>
        </View>

        {/* CURRENT RIDDLE */}
        <ActiveGameCard activeGame="" />

        <View className='flex-col gap-6'>
          {/* RIDDLES PARTICIPATED */}
          {/* <Link href="/(tabs)/riddle/participated" replace asChild>
            <TouchableOpacity>
              <ModuleLink title="Enigmes participées" number={18} />
            </TouchableOpacity>
          </Link> */}
          {/* <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/riddle/participated",
                params: {}
              });
            }}
          >
            <ModuleLink title="Enigmes participées" number={18} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => router.push("/riddles/participated")}
          >
            <ModuleLink title="Enigmes participées" number={18} />
          </TouchableOpacity>
          {/* <Link href="/(tabs)/riddle?initialRoute=participated" asChild >
            <TouchableOpacity>
              <ModuleLink title="Enigmes participées" number={18} />
            </TouchableOpacity>
          </Link> */}

          {/* RIDDLES CREATED */}
          {/* <Link href="/(tabs)/riddle/created" replace asChild>
            <TouchableOpacity>
              <ModuleLink title="Enigmes créées" number={7} />
            </TouchableOpacity>
          </Link> */}
          {/* <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/riddle/created",
                params: {}
              });
            }}
          >
            <ModuleLink title="Enigmes créées" number={7} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => router.push("/riddles/created")}
          >
            <ModuleLink title="Enigmes créées" number={7} />
          </TouchableOpacity>
          {/* <Link href="/(tabs)/riddle?initialRoute=created" asChild >
            <TouchableOpacity>
              <ModuleLink title="Enigmes créées" number={7} />
            </TouchableOpacity>
          </Link> */}
        </View>

        {/* LEADERBOARD */}
        <View className='flex gap-2'>
          <Link href="/home/leaderboard" asChild>
            <TouchableOpacity>
              <SectionLink title="Classement" />
            </TouchableOpacity>
          </Link>
          <Leaderboard
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            totalData={totalData}
          />
        </View>

        <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
           that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
             Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
        
        <Ionicons name="footsteps-outline" size={24} color="black" />
        <Ionicons name="qr-code-outline" size={24} color="black" />
        <Ionicons name="trophy-outline" size={24} color="black" />
        <MaterialIcons name="sports-score" size={24} color="black" />
        <AntDesign name="enviromento" size={24} color="black" />
        <AntDesign name="rocket1" size={24} color="black" />
        <Ionicons name="bulb-outline" size={24} color="black" />
        <Ionicons name="construct-outline" size={24} color="black" />
        <Ionicons name="contrast-outline" size={24} color="black" />
        <Ionicons name="dice-outline" size={24} color="black" />
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
        <Ionicons name="finger-print" size={24} color="black" />
        <Ionicons name="flag-outline" size={24} color="black" />
        <Ionicons name="flashlight-outline" size={24} color="black" />
        <Ionicons name="hourglass-outline" size={24} color="black" />
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Ionicons name="journal-outline" size={24} color="black" />
        <Ionicons name="location-outline" size={24} color="black" />
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Ionicons name="log-in-outline" size={24} color="black" />
        <Ionicons name="mail-outline" size={24} color="black" />
        <Ionicons name="mail-unread-outline" size={24} color="black" />
        <Ionicons name="medal-outline" size={24} color="black" />
        <Ionicons name="navigate-circle-outline" size={24} color="black" />
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Ionicons name="podium-outline" size={24} color="black" />
        <Ionicons name="ribbon-outline" size={24} color="black" />
        <Ionicons name="scan" size={24} color="black" />
        <Ionicons name="school-outline" size={24} color="black" />
        <Ionicons name="settings-outline" size={24} color="black" />
        <Ionicons name="time-outline" size={24} color="black" />
        <Ionicons name="timer-outline" size={24} color="black" />
        <Ionicons name="trail-sign-outline" size={24} color="black" />
        <Ionicons name="trash-outline" size={24} color="black" />
        <Ionicons name="warning-outline" size={24} color="black" />
        <Entypo name="price-ribbon" size={24} color="black" />
      </View>
    </ParallaxScrollView>
  );
}