<template>
    <div>
        <b-modal title="Novo Contato" @ok.prevent="store(fields.id ? fields.id : null)" @hidden="fields = {}" ok-title="Cadastrar" ok-variant="success" id="form-cadastro" ok-only>
            <b-form>
                <b-form-group label="Nome" label-for="nome">
                    <b-form-input
                    id="nome"
                    v-model="fields.nome"
                    required
                    placeholder="Nome Completo"
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Sexo" label-for="sexo">
                    <b-form-select v-model="fields.sexo" :options="options"></b-form-select>
                </b-form-group>

                <b-form-group label="Telefone" label-for="telefone">
                    <b-form-input
                    id="telefone"
                    v-model="fields.telefone"
                    required
                    v-mask="'(##) #####-####'"
                    placeholder="(99) 99999-9999"
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Email" label-for="email">
                    <b-form-input
                    id="email"
                    v-model="fields.email"
                    type="email"
                    required
                    placeholder="email@email.com"
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import constant from '../constants/constants';
    export default {
        name: 'ContatoModal',
        data() {
            return {
                fields: {},
                actionForm: {},
                options: [
                    { value: 'Masculino', text: 'Masculino'},
                    { value: 'Feminino', text: 'Feminino'},
                ]
            }
        },
        methods: {
            form() {
                this.actionForm = {
                    url: 'contato',
                    method: 'post'
                };
                this.$bvModal.show('form-cadastro');
            },
            async edit(id) {
                try {
                    const {data} = await axios.get(`contato/${id}`);
                    this.actionForm = {
                        url: 'contato',
                        method: 'put'
                    };
                    this.fields = data;
                    this.$bvModal.show('form-cadastro');
                } catch (e) {
                    console.log(e)
                }
                
            },
            
            async destroy(contato) {
                this.$toast.question(constant.DELETE, constant.TITLEWARNING,{
                    position: 'center',
                    buttons: [
                        ['<button>Sim</button>', (instance, toast) => {
                            this.delete(contato);
                            
                            this.$toast.success(constant.DELETEMESSAGE, constant.TITLESUCCESS, {position: "topRight"})

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                        }, true],
                        ['<button>Não</button>', function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        }]
                    ]
                })
            },

            async delete(contato) {
                try {
                    const {data} = await axios({
                        method: 'delete',
                        url: 'contato/' + contato
                    });
                    this.$emit('updateTable');
                } catch(e) {
                    console.log(e)
                }
            },
            
            async store(id) {
                try{
                    let url = id ? this.actionForm.url + '/' + id : this.actionForm.url;
                    
                    const {data} = await axios({
                        method: this.actionForm.method,
                        url:url,
                        data: this.fields
                    });
                    
                    this.$toast.success(this.actionForm.method == 'post' ? constant.SAVE : constant.UPDATE, constant.TITLESUCCESS, {position: "topRight"})
                    this.$emit('updateTable');
                    this.$nextTick(()=> this.$bvModal.hide('form-cadastro'));
                }catch(e){
                    console.log(e)
                }
            },
        }
    }
</script>

<style>

</style>