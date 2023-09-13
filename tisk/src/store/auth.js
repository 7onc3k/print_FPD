import { supabase } from '../supabaseClient';

const state = {
    user: null,
    session: null
};

const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    },
    SET_SESSION(state, payload) {
        state.session = payload;
    }
};

const actions = {
    async signIn({ commit }, { email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (data) {
            commit('SET_USER', data.session.user);
            commit('SET_SESSION', data.session);
        }
        return { data, error };
    },
    async signOut({ commit }) {
        await supabase.auth.signOut();
        commit('SET_USER', null);
        commit('SET_SESSION', null);
    },
    async fetchUser({ commit }) {
        console.log("Kontrola session...");
        const { data, error } = await supabase.auth.getSession();
        if (data && data.session) {
            console.log("Session nalezena:", data);
            commit('SET_USER', data.session.user);
            commit('SET_SESSION', data.session);
            console.log(state.user, state.session)
        } else {
            console.log("Žádná session nenalezena.");
            commit('SET_USER', null);
            commit('SET_SESSION', null);
            if (error) {
                console.error("Chyba při získávání session:", error);
            }
        }
    }
    
    ,
    async signUp({ commit }, { email, password }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        if (data) {
            // Pokud je potřeba ověření e-mailu, zde by byla session null.
            commit('SET_USER', data.session.user);
            commit('SET_SESSION', data.session);
        }
        return { data, error };
    },
    // v auth.js

    // ...
    
    // ...
  
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
