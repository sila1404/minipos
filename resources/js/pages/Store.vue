<template>
    <div class="card">
        <h5 class="card-header">ລາຍການ ສະຕ໋ອກສິນຄ້າ</h5>
        <div class="card-body">
            <div v-if="ShowForm">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-success me-2" @click="saveStore()" :disabled="CheckForm">ບັນທຶກ</button>
                    <button type="button" class="btn btn-secondary" @click="CancelStore()">ຍົກເລີກ</button>
                </div>
                {{ FormStore }}
                <hr>
                <div class="row">
                    <div class="col-md-4">Image</div>
                    <div class="col-md-8">
                        <div>
                            <label class="form-label fs-6">
                                ຊື່ສິນຄ້າ: <span class="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                class="form-control mb-2"
                                placeholder="......"
                                v-model="FormStore.name"
                            />
                            <label class="form-label fs-6">
                                ຈຳນວນ: <span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                class="form-control mb-2"
                                placeholder="......"
                                v-model="FormStore.amount"
                            />
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="form-label fs-6">
                                        ລາຄາຊື້:
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control mb-2"
                                        placeholder="......"
                                        v-model="FormStore.price_buy"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fs-6">
                                        ລາຄາຂາຍ:
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control mb-2"
                                        placeholder="......"
                                        v-model="FormStore.price_sell"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive text-nowrap" v-if="!ShowForm">
                <div class="d-flex justify-content-between mb-2">
                    <div class="d-flex align-items-center">
                        <div>
                            <i class="bx bx-sort-up"></i>
                        </div>
                        <select class="form-select">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div class="d-flex">
                        <input
                            type="text"
                            class="form-control me-2"
                            placeholder="ຄົ້ນຫາ..."
                        />
                        <button type="button" class="btn btn-primary" @click="AddStore()">
                            <i class="bx bxs-user-plus me-2 fs-4"></i>ເພີ່ມໃໝ່
                        </button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ຮູບພາບ</th>
                            <th>ຊື່ສິນຄ້າ</th>
                            <th>ລາຄາຊື້</th>
                            <th>ຈັດການ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <i
                                    class="bx bxl-angular bx-sm text-danger me-3"
                                ></i>
                                <span class="fw-medium">Angular Project</span>
                            </td>
                            <td>Albert Cook</td>
                            <td>ກກກກກກ</td>
                            <td>
                                <span class="badge bg-label-primary me-1">
                                    Active
                                </span>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button
                                        type="button"
                                        class="btn p-0 dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i
                                            class="bx bx-dots-vertical-rounded"
                                        ></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                            ><i class="bx bx-edit-alt me-1"></i>
                                            ແກ້ໄຂ
                                        </a>
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                            ><i class="bx bx-trash me-1"></i>
                                            ລົບ
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '../store/auth';

export default {
    name: "Minipos13Store",
    setup() {
        const store = useStore()
        return {store}
    },

    data() {
        return {
            ShowForm: false,
            FormType: true,
            SoreData: [],
            FormStore: {
                name: "",
                image: "",
                amount: "",
                price_buy: "",
                price_sell: "",
            },
        };
    },

    mounted() {},
    computed: {
        CheckForm() {
            if(this.FormStore.name == "" || this.FormStore.amount == "" || this.FormStore.price_buy == "" || this.FormStore.price_sell == "") {
                return true
            } else {
                return false
            }
        }
    },

    methods: {
        AddStore() {
            this.ShowForm = true
            this.FormType = true
        },
        CancelStore() {
            this.ShowForm = false
        },
        saveStore() {
            if(this.FormType) {

                axios.post("api/store/add", this.FormStore, {
                    headers: {
                        Authorization: 'Bearer' + this.store.get_token
                    }
                }).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error)
                })
            } else {

            }
        }
    },
};
</script>

<style lang="scss" scoped></style>
