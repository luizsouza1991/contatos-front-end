<template>
    <b-container class="mt-3">
        <b-card>
            <b-card-body>
                <b-button class="float-right mb-2" variant="success" @click.prevent="$refs.modal_contatos.form()"><i class="fas fa-plus"></i> Cadastrar</b-button>
                <b-table responsive striped hover 
                :items="contatos" 
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage">
                    <template v-slot:cell(id)="data">
                        <b-dropdown text='Ações' variant="success">
                            <b-dropdown-item @click="$refs.modal_contatos.edit(data.value)"> <i class="fas fa-edit"></i> Editar</b-dropdown-item>
                            <b-dropdown-item @click="$refs.modal_contatos.destroy(data.value)"> <i class="fas fa-trash"></i> Excluir</b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
                <b-pagination
                v-model="currentPage"
                :total-rows="contatos.length"
                :per-page="perPage"
                align="center"
                ></b-pagination>
            </b-card-body> 
        </b-card>
        <contato-modal ref="modal_contatos" @updateTable="tableContatos"/>
    </b-container>
</template>

<script>
    import ContatoModal from "./ContatoModal";
    export default {
        name: 'Contatos',
        components: {
            ContatoModal
        },
        data() {
            return {
                perPage: 5,
                currentPage: 1,
                contatos: [],
                fields: [
                    {key: 'id', label: 'Ações'},
                    'nome',
                    'sexo',
                    'telefone',
                    'email'
                ]
            }
        },
        created() {
            this.tableContatos();
        },
        methods:{
            async tableContatos(){
                const {data} = await axios.get('contatos');
                this.contatos = data;
            }
        }
    }
</script>

<style>
</style>
