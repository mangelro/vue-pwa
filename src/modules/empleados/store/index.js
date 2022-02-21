
export default {
    
    namespaced:true,

    state:()=>({
        employees:[
            {id:'4f023fe9-32c7-4f5e-b7b9-6afb51eb3ca2',phone:'654374429',email:'pool@oliva.net',name:'Juan Manuel Alarcón Morata', picture:'https://userstock.io/data/wp-content/uploads/2020/06/tyler-nix-PQeoQdkU9jQ-1024x1024.jpg'},
            {id:'8686a148-83aa-4250-a76b-2b7499573e2b',phone:'654374429',email:'adm2@oliva.net',name:'Asunción Galey Collado', picture:'https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-1011x1024.jpg'},
            {id:'6edaa9c8-dcaa-42d6-9d3c-ec1b33a9eba8',phone:'654374429',email:'adm@oliva.net',name:'Eloisa Luján Martinez', picture:'https://userstock.io/data/wp-content/uploads/2017/09/tamara-bellis-189613-1024x681.jpg'},
            {id:'1b0d3479-efa5-4ca9-a295-c969243961ab',phone:'654374429',email:'fundacion@oliva.net',name:'Manuel Navas Caballero', picture:'https://userstock.io/data/wp-content/uploads/2020/05/warren-wong-VVEwJJRRHgk-1024x1024.jpg'},
            {id:'e43e99a5-35aa-4d36-8022-b980d17b683b',phone:'654374429',email:'oleum@oliva.net',name:'Luis Ortega Cantero', picture:'https://userstock.io/data/wp-content/uploads/2017/07/william-stitt-111007-683x1024.jpg'},
            {id:'f2e18574-e5af-412e-94c0-841c9baffa38',phone:'654374429',email:'prog3@oliva.net',name:'Antonio Pérez Montilla', picture:'https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-205182.jpg'},
            {id:'f6923200-7d0e-4aa6-b7ed-b2103b77da39',phone:'654374429',email:'oelum2@oliva.net',name:'Francisco Rodríguez Moreno', picture:'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-26939-1-1024x1024.jpg'},
            {id:'fc72dd06-f6f1-4ff7-bda2-084ca941542a',phone:'654374429',email:'prog2@oliva.net',name:'Miguel Angel Romera Ortega', picture:'https://userstock.io/data/wp-content/uploads/2020/06/jack-finnigan-rriAI0nhcbc-1024x1024.jpg'},
            {id:'39a694c7-aedd-4500-a4fe-ea92fbb686bc',phone:'654374429',email:'prog4@oliva.net',name:'Salvador Ruiz Plaza', picture:'https://userstock.io/data/wp-content/uploads/2020/05/imansyah-muhamad-putera-n4KewLKFOZw-1024x1024.jpg'},
            {id:'1f1a2e4e-274b-4d28-98ac-381d010458a0',phone:'654374429',email:'prog@oliva.net',name:'José María López Padilla', picture:'https://userstock.io/data/wp-content/uploads/2017/07/kelly-searle-209751-1024x679.jpg'},

        ]
    }),

    mutations:{
    },

	actions:{

	},

    getters:{
        getAllEmployees:(state)=>{
            const employees= state.employees
            return [...employees]
        },

        getEmployeById:(state)=> (id=0)=>{
            const employe= state.employees.find(e => e.id===id)
            if (!employe) return
            return  {...employe} //es MUY aconsejable devolver una copia por si se modifica. No modificar el State!!!!!
        },
        
	}

}