<template >
    <v-container fluid fill-height>
       
            <v-layout align-center justify-center  >
               <div v-if="loading==true">
               <center>
                  <v-progress-circular
                  :size="100"
                  :width="7"
                  color="primary"
                  indeterminate
               ></v-progress-circular>
               <h1>Loading</h1>
               </center>
            </div>
               <v-flex xs12 sm8 md4 v-else>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <!-- <v-text-field
                            v-model="users.name"
                              prepend-icon="mdi-account"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field> -->
                           <v-text-field
                            v-model="users.email"
                              prepend-icon="mdi-account"
                              name="Email"
                              label="Email"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                           v-model="users.password"
                              id="password"
                              @keyup.enter="login()"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="registerDialog()">register</v-btn>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
            
            <v-dialog v-model="dialog"  transition="dialog-bottom-transition" persistent scrollable max-width="300px">
               <v-card>
                  <v-toolbar dark color="primary" flat dense>
                     <v-toolbar-title>Register</v-toolbar-title>
                     <v-spacer/>
                     <v-icon @click="dialog=!dialog">mdi-close</v-icon>
                  </v-toolbar>
                  <v-card-text>
                        <br/>
                        <v-text-field v-model="register.name" type="text" label="Username" dense rounded outlined></v-text-field>
                        <v-text-field v-model="register.email" type="text" label="Email" dense rounded outlined></v-text-field>
                        <v-text-field v-model="register.password" type="password" label="Password" dense rounded outlined></v-text-field>
                        
                        <v-card-actions>
                           <v-spacer/>
                           <v-btn color="primary" @click="registerAcc()">register</v-btn>
                        </v-card-actions>
                  </v-card-text>
               </v-card>
            </v-dialog>
         </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: "",
    data:()=>({
        users:{},
        loading:false ,
        dialog:false,
        register:{},
        baseUrl:'http://localhost:5000/',
    }),
    methods: {
      login(){
            axios({
                method : 'POST',
                url : `${this.baseUrl}login`,
                data : this.users
            }).then((res) => {
               if(res.status == 200)
               localStorage.setItem('token',res.data.token)
               this.$router.push('/')
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });

      },
        registerAcc(){
            axios({
                method : 'POST',
                url : `${this.baseUrl}signup`,
                data : this.register
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });
        },
        registerDialog(){
          this.dialog=!this.dialog
       },
    },
  
}
</script>
<style>

</style>