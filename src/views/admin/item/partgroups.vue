<template>
	<div id="partGroups">
		<div class="container">
			<!--------添加一级班组弹出窗------->

			<el-dialog id="find_out" v-model="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="一级班组：" :label-width="formLabelWidth">
						<el-input class="center_input" v-model="addgroup" auto-complete="on" placeholder="请输入班组名称"></el-input>
						<span class="addbanzu" @click="inaddgroups">
							添加
						</span>
					</el-form-item>
					<el-table class="deaital" :data="listproject.data" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column align="center" prop="name" label="名称" width="200">
						</el-table-column>
						<el-table-column align="center" prop="fullTimeCount" label="全职班组" width="200">
						</el-table-column>
						<el-table-column align="center" prop="partTimeCount" label="兼职班组" width="200">
						</el-table-column>
						<el-table-column align="center" prop="provide" label="操作" width="200">
							<template scope="scope">
								<el-button size="small" type="primary" @click="choiceRow(scope.$index, scope.row)">选择</el-button>
								<el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
			</el-dialog>
			<div class="addgroup">
				<div class="banzu">
					<div>
						一级班组：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="选择一级班组">
					</el-input>
					<div class="center_add" @click="showlisttable">
						添加一级班组
					</div>
				</div>
				<div class="banzu">
					<div>
						二级班组名称：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="填写班组名称"></el-input>
				</div>
				<div class="banzu">
					<div>
						选择收入模式：
					</div>
					<el-input v-model="input" class="widthdian" placeholder="填写班组名称"></el-input>
				</div>
			</div>
			<div class="numberPrice">
				<div class="danjia">
					<span>
						接单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						放单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						日工资：
					</span>
					<el-input-number v-model="num2" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						核定日工资：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						请假单价：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						超时工资：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价1：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=10件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价2：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=20件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价3：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=30件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价4：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						计件条件》=40件 ：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						全勤奖：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<span>
						全勤天数：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						餐补：
					</span>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="danjia">
					<el-button type="primary" @click="addBtn" class="addlast">添加</el-button>
					<el-button type="danger" id="nomargin" @click="cancelBtn" class="addlast">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '../../../common/util';
	export default {
		name: "partGroups",
		data() {
			return {
				choicegroup: [{
					name: ""
				}],
				choice: true,
				input: "",
				num1: "1",
				num2: "1",
				dialogFormVisible: false,
				addgroup: {
					projectId: 1,
					name: ""
				},
				deleteBt: {
					id: 1
				},
				listproject: {
					data: [{
						name: "",
						fullTimeCount: "",
						id: 2,
						partTimeCount: "",
						projectId: 1,
						status: "0"
					}]
				},
				banzugroups: {
					partTimeTeam: [{
						fristJobId: 1,
						fristJobName: "一级班组",
						secondJob: "二级班组",
						incomeType: 1,
						type: 0,
						receiveOrderAmount: 10,
						sendOrderAmount: 5,
						salary: 10,
						conditionList: [{
							amount: 10,
							condition: 10
						}, {
							amount: 20,
							condition: 20
						}, {
							amount: 30,
							condition: 30
						}, {
							amount: 40,
							condition: 40
						}]
					}],
					fullTimeTeam: [{
						fristJobId: 1,
						fristJobName: "一级班组",
						secondJob: "二级班组",
						incomeType: 1,
						type: 1,
						receiveOrderAmount: 10,
						sendOrderAmount: 5,
						salary: 10,
						leaveAmount: 10,
						overtimeAmount: 20,
						fullTimeBonus: 100,
						fullTimeDays: 30,
						mealSupplement: 20,
						checkDayTime: 8,
						conditionList: [{
							amount: 10,
							condition: 10
						}, {
							amount: 20,
							condition: 20
						}, {
							amount: 30,
							condition: 30
						}, {
							amount: 40,
							condition: 40
						}]
					}]
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			};
		},
		methods: {
			showlisttable() {
				this.dialogFormVisible = true;
				this.listshow();
			},
			//内部添加班组
			inaddgroups() {
				//				this.listshow();
				const params = {
					projectId: this.addgroup.projectId,
					name: this.addgroup.name
				}
				this.$http.post('/project/add', params).then((response) => {

					if(response.data.errorCode === 10000) {
						const {

						} = response.data;
						this.listshow();
						this.$notify({
							title: '添加成功',
							type: 'success',
						});
					} else {
						this.$notify.error({
							title: '添加异常',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			//选择添加自定义班组
			choiceRow(index, row) {
				const params = {
					id: row.id
				};
				this.choicegroup = this.listproject.data.name;

				console.log(choicegroup);
			},
			deleteRow(index, row) {
				const params = {
					id: row.id
				};
				this.$http.post('/project/job/delete', params).then((response) => {
					if(response.data.errorCode === 10000) {
						const {

						} = response.data;
						this.listproject.data.splice(index, 1);
						this.$notify.error({
							title: '删除成功',
							type: 'success',
						});
					} else {
						this.$notify.error({
							title: '删除失败',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			listshow() {
				const params = {
					id: this.listproject.data[0].id,
					fullTimeCount: this.listproject.data[0].fullTimeCount,
					partimeCount: this.listproject.data[0].partTimeCount,
					projectId: this.listproject.data[0].projectId,
					name: this.listproject.data[0].name,
					status: this.listproject.data[0].status
				}
				this.$http.post('/project/job/list', params).then((response) => {
					if(response.data.errorCode === 10000) {
						this.listproject.data = response.data.data
						//						this.$notify({
						//							title: "添加成功",
						//							type: 'success',
						//						});
					} else {
						this.$notify.error({
							title: '添加异常',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},

			//添加班组
			addBtn() {
				this.$router.push({
					name: 'adminItemNew',
					params: {
						id: this.$route.params.id,
					}
				});
			},
			//取消按钮
			cancelBtn() {
				this.$router.push({
					name: 'adminItemNew',
					params: {
						id: this.$route.params.id
					}
				});
			},
			handleSelectionChange(val) {
				this.listshow();
				this.multipleSelection = val;
			},
			handleChange(value) {
				console.log(value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#partGroups {
		width: 100%;
		height: 100%;
		.deaital {
			text-align: center;
		}
		.container {
			width: 1000px;
			height: 100%;
			margin-left: 100px;
			.center_input {
				width: 70%;
			}
			.addbanzu {
				width: 50px;
				margin-left: 20px;
				color: royalblue;
				cursor: pointer;
			}
			.addgroup {
				width: 100%;
				height: 200px;
				.banzu {
					width: 100%;
					height: 40px;
					padding: 10px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.widthdian {
						width: 550px;
						height: 100%;
					}
					div {
						width: 160px;
						height: 100%;
						color: dodgerblue;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					div:nth-of-type(1) {
						color: black;
					}
					.center_add {
						text-align: center;
						cursor: pointer;
					}
				}
			}
			.numberPrice {
				width: 100%;
				height: 100%;
				.danjia {
					width: 100%;
					height: 40px;
					padding: 14px 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					#nomargin {
						margin-left: 100px;
					}
					.addlast {
						width: 180px;
						margin-left: 180px;
					}
					span {
						width: 160px;
						height: 100%;
						text-align: right;
						line-height: 40px;
						margin-right: 20px;
					}
					span:nth-of-type(2) {
						width: 200px;
					}
				}
			}
		}
	}
</style>