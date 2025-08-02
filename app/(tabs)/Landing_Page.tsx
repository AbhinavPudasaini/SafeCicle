import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/top_bar";
import "../global.css";



const images = {
  "bell.png": require("../../assets/images/bell.png"),
  "location.png": require("../../assets/images/location.png"),
  "people.png": require("../../assets/images/people.png"),
};

function Features({img_name, title, desc, color}) {
  return (
    <View style={{backgroundColor:"#f0f4f8", padding:20, gap:10, borderRadius:15, marginTop:10, width:360}}>
      <View style={{backgroundColor:`${color}`, width:70, height:70, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:50}}>

      <Image
        style={{width:45, height:45, borderRadius:50}}
        source={images[img_name]}
        />
        </View>
      <Text style={{fontWeight:"bold", fontSize:18}}>{title}</Text>
      <Text style={{fontSize:14, color:"#555"}}>{desc}</Text>
    </View>
  );
}

function Process({no, title, desc, color}) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15,
      gap: 15,
      marginLeft:10,

    }}>
      {/* Number in a circle */}
      <View style={{
        backgroundColor: `${color}`,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
      }}>
        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{no}</Text>
      </View>
      {/* Title and description */}
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>{title}</Text>
        <Text style={{fontSize: 16, color: "#555"}}>{desc}</Text>
      </View>
    </View>
  );
}

 
export default function Landing() {
  const router = useRouter();
  

  const handleNumber = ()=>{

    router.push('/Number')

  }
  return (
    <>
    <ScrollView>
  
    <SafeAreaView className="flex-1 items-center justify-start bg-white p-4">
      <Navbar/>

      <Text style={{color:"#3b82f6", fontSize:14, backgroundColor:"#e0f2fe", padding:8, borderRadius:12, marginVertical:15}}>Community-Powered Safety</Text>
      <Text style={{fontSize:28, fontWeight:"bold"}}>Where 911 fails,</Text>
      <Text style={{fontSize:28, fontWeight:"bold", color:"#22c55e"}}>neighbours rise</Text>
      <Text
      style={{
        fontSize:16,
        textAlign:"center",
        marginTop:15,
        color:"#555"
      }}
      >Connect with your community for instant help , real-time safety updates, and peace of mind.</Text>

      <View style={{backgroundColor:"#ef4444", width:120, height:120, borderRadius:60, display:"flex", justifyContent:"center", alignItems:"center", marginVertical:20}}>
        <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Emergency</Text>
      </View>

      <View>
        <Pressable
        onPress={handleNumber}
        >
          {({pressed}) => (
            <Text style={[{ backgroundColor:"#10b981", borderRadius:12, padding:15, marginVertical:20, color:"white", fontSize:16, fontWeight:"bold"}, pressed && {opacity: 0.8}]}>Continue with Phone number</Text>
          )}
        </Pressable>
      </View>

      <View style={{display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginVertical:20}}>
        <Text style={{fontSize:24, fontWeight:"bold"}}>Key Features</Text>
        <Text style={{fontSize:16, color:"#555"}}>Everyhing you need to stay safe..</Text>
        <Features img_name="bell.png" title="Instant Alerts" desc = "Send emergency notifications with one tap."  color="#ef4444"/>
        <Features img_name="location.png" title="Live Location" desc = "Share your precise location automatically" color="#3b82f6"/>
        <Features img_name="people.png" title="Community" desc = "Connect with verified neighbors" color="#22c55e"/>
      

      </View>

      <View style={{marginVertical:20, display:"flex", justifyContent:"center", alignItems:"center", gap:8}}>
        <Text style={{fontSize:24, fontWeight:"bold"}}>How SafeCircle Works</Text>
        <Text style={{fontSize:16, color:"#555"}}>Three simple steps to community safety.</Text>
      </View>

      <Process no = "1" title = "Request Help" desc = "Tap the emergency button to instantly alert your safety circle." color="#ef4444" />
      <Process no = "2" title = "Share Location" desc = "Share your precise location automatically" color="#3b82f6" />
      <Process no = "3" title = "Get Help" desc = "Connect with verified neighbors to get help" color="#22c55e" />
      
    </SafeAreaView>
    </ScrollView>
   
    </>

  );
}