<template>
	<div id="itemGroups">
		<div class="container">
			<!--------添加一级班组弹出窗------->
			<el-dialog id="find_out" v-model="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="一级班组：" :label-width="formLabelWidth">
						<el-input class="center_input" v-model="addgroup.name" auto-complete="on" placeholder="请输入班组名称"></el-input>
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
						一级岗位：
					</div>
					<el-input v-model="fullTimeTeam.fristJobName" class="widthdian" placeholder="选择一级班组">
					</el-input>
					<div class="center_add" @click="showlisttable">
						添加一级班组
					</div>
				</div>
				<div class="banzu">
					<div>
						二级班组名称：
					</div>
					<el-input v-model="fullTimeTeam.secondJob" auto-complete="off" class="widthdian" placeholder="填写班组名称"></el-input>
				</div>
				<div class="banzu">
					<div>
						选择收入模式：
					</div>
					<el-input v-model="fullTimeTeam.incomeType" auto-complete="on" class="widthdian" placeholder="填写收入模式"></el-input>
				</div>
			</div>
			<div class="numberPrice">			
				<div class="danjia">
					<span>
						接单价：
					</span>
					<el-input-number v-model="fullTimeTeam.receiveOrderAmount" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						放单价：
					</span>
					<el-input-number v-model="fullTimeTeam.sendOrderAmount" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						日工资：
					</span>
					<el-input-number v-model="fullTimeTeam.salary" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						核定日工资：
					</span>
					<el-input-number v-model="fullTimeTeam.checkDayTime" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						请假单价:
					</span>
					<el-input-number v-model="fullTimeTeam.leaveAmount" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						超时工资：
					</span>
					<el-input-number v-model="fullTimeTeam.overtimeAmount" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				
				
				<div class="danjia">
					<span>
						计件单价1：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[0].amount" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						计件条件》=10件 ：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[0].numberCondition" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价2：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[1].amount" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						计件条件》=20件 ：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[1].numberCondition" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价3：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[2].amount" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						计件条件》=30件 ：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[2].numberCondition" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						计件单价4：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[3].amount" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						计件条件》=40件 ：
					</span>
					<el-input-number v-model="fullTimeTeam.conditionList[3].numberCondition" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				
				
				<div class="danjia">
					<span>
						全勤奖：
					</span>
					<el-input-number v-model="fullTimeTeam.fullTimeBonus" @change="handleChange" :min="1" :max="10000"></el-input-number>
					<span>
						全勤天数：
					</span>
					<el-input-number v-model="fullTimeTeam.fullTimeDays" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="danjia">
					<span>
						餐补：
					</span>
					<el-input-number v-model="fullTimeTeam.mealSupplement" @change="handleChange" :min="1" :max="10000"></el-input-number>
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
	import { newProject } from '../../../store/data';

	export default {
		name: "itemGroups",
		data() {
			return {
				fullTimeTeam: {
					fristJobId: 1,
					fristJobName: "",
					secondJob: "",
					incomeType: '',
					type: 1,
					receiveOrderAmount: "",
					sendOrderAmount: "",
					salary: "",
					leaveAmount: "",
					overtimeAmount: "",
					fullTimeBonus: "",
					fullTimeDays: "",
					mealSupplement: "",
					//核定日工资
					checkDayTime: '',
					conditionList: [{
						amount: '',
						numberCondition: ''
					}, {
						amount: '',
						numberCondition: ''
					}, {
						amount: '',
						numberCondition: ''
					}, {
						amount: '',
						numberCondition: ''
					}]
				},
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
						status: 0
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
			dealconditionList(){
				
			},
			showlisttable() {
				this.dialogFormVisible = true;
				this.listshow();
			},
			//内部添加班组
			inaddgroups() {
				const params = {
					projectId: this.addgroup.projectId,
					name: this.addgroup.name,
				}
				this.$http.post('/project/job/add', params).then((response) => {
					if(response.data.errorCode === 10000) {
						const {
							error,
							errorCode
						} = response.data;
						this.listshow();
						this.$notify({
							title: '添加成功',
							type: 'success',
						});
					} else {
						console.log(response.data);
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
				this.fullTimeTeam.fristJobName = row.name;
				this.fullTimeTeam.fristJobId = row.id
				this.dialogFormVisible = false;
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
				newProject.addFullTime(this.fullTimeTeam)
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

			}
		},
		mounted() {
			this.listshow();
		}
	}
</script>

<style lang="scss" scoped>
	#itemGroups {
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