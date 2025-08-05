import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth, { firebaseLogin, firebaseLogout } from "../firebase/auth.js";

export const AuthContext = createContext();

function AuthProvider(props) {
    // 1. Adicionamos um estado para o usuário e um para o carregamento.
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. O useEffect com onAuthStateChanged ouve o estado de autenticação do Firebase.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // O Firebase nos informa o objeto do usuário (se logado) ou null.
            setUser(user);
            setLoading(false); // Marca o carregamento como concluído.
        });

        // 3. A função de limpeza do useEffect remove o listener para evitar vazamentos de memória.
        return () => unsubscribe();
    }, []); // O array vazio [] garante que isso rode apenas uma vez.

    // A função de login agora apenas chama a função do Firebase.
    // O onAuthStateChanged cuidará de atualizar o estado.
    async function login(email, senha) {
        await firebaseLogin(email, senha);
    }

    // A função de logout também é simplificada.
    async function logout() {
        await firebaseLogout();
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user, // Deriva o booleano a partir do objeto user
            user,
            loading,
            login,
            logout
        }}>
            {/* Não renderiza os filhos até que o estado de autenticação seja verificado */}
            {!loading && props.children}
        </AuthContext.Provider>
    );
}
function useAuth() {
    return useContext(AuthContext);
}   

export { 
    AuthProvider,
    useAuth 
};