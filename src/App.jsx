import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/
resource').Schema>}
 */
Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});
export default function App() {
  const [userprofiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    fetchUserProfile();
  }, []);
  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    console.log("LO QUE LLEGA DE LA BD:", profiles); 
    setUserProfiles(profiles);
  }
  return (
  <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="100%"
      minHeight="100vh"
      backgroundColor="#f3f4f6" /* Fondo gris muy suave para toda la pantalla */
      padding="2rem"
    >
      {/* Contenedor principal estilo "Tarjeta" */}
      <Flex
        direction="column"
        backgroundColor="white"
        padding="3rem"
        borderRadius="1rem"
        boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.1)" /* Sombra elegante */
        width="100%"
        maxWidth="500px"
        alignItems="stretch"
      >
        <Heading level={2} textAlign="center" color="#1f2937">
           Mi Perfil AWS
        </Heading>
        <Divider margin="1.5rem 0" />

        <Grid
          margin="1rem 0 2rem 0"
          templateColumns="1fr"
          gap="1.5rem"
        >
          {userprofiles.map((userprofile) => (
            <Flex
              key={userprofile.id || userprofile.email}
              direction="row"
              alignItems="center"
              gap="1.5rem"
              backgroundColor="#f8fafc" /* Fondo azul/gris clarito */
              padding="1.5rem"
              borderRadius="0.75rem"
              border="1px solid #e2e8f0"
            >
              {/* Círculo tipo Avatar */}
              <View
                backgroundColor="#3b82f6" /* Azul bonito */
                width="3.5rem"
                height="3.5rem"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Heading level={3} color="white" margin="0">
                  {userprofile.email.charAt(0).toUpperCase()}
                </Heading>
              </View>
              
              {/* Textos del usuario */}
              <View>
                <Heading level={5} color="#64748b" fontWeight="normal" margin="0">
                  Usuario Registrado
                </Heading>
                <Heading level={4} color="#0f172a" margin="0">
                  {userprofile.email}
                </Heading>
              </View>
            </Flex>
          ))}
        </Grid>

        <Button 
          onClick={signOut} 
          variation="destructive" /* Lo pone rojo automáticamente */
          size="large"
          borderRadius="0.5rem"
        >
          Cerrar Sesión
        </Button>
      </Flex>
    </Flex>
  );
}