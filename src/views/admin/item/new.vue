<template>
	<div id="itemNew">
		<el-form :model="itemPublishInfo" :rules="itemPublishRules" ref="itemPublishForm">
			<h1 class="tips">基本信息</h1>
			<el-form-item label="项目名称：" class="form-item" prop="title">
				<el-input v-model="itemPublishInfo.title" placeholder="请输入内容" style="width: 400px;"></el-input>
			</el-form-item>
			<el-form-item label="项目地址：" class="form-item" prop="address">
				<el-input v-model="itemPublishInfo.address" placeholder="请在地图上进行选择" style="width: 400px;"></el-input>
				<el-button v-if="!isMapShow" type='primary' @click="handleShowMap">展开地图</el-button>
				<el-button v-if="isMapShow" type='primary' @click="handleShowMap">收起地图</el-button>
			</el-form-item>
			<div v-if="isMapShow">
				<el-input v-model="mapConfig.keyword" placeholder="搜索地点，并进行选择" style="width: 440px; margin-bottom: 5px;"></el-input>
				<baidu-map class="map-container" :scroll-wheel-zoom="true" :center="mapConfig.center" :zoom="mapConfig.zoom">
					<bm-view class="bm-view">
					</bm-view>
					<bm-local-search :keyword="mapConfig.keyword" :auto-viewport="true" :location="mapConfig.location" @infohtmlset="infohtmlset">
					</bm-local-search>
				</baidu-map>
			</div>
			<el-form-item label="项目介绍：" class="form-item" prop="introduction">
				<el-input type="textarea" :rows="2" v-model="itemPublishInfo.introduction" placeholder="请输入内容" style="width: 400px;"></el-input>
			</el-form-item>
			<h1 class="tips">匹配负责人</h1>
			<el-form-item label="招聘前台：" class="form-item" prop="recruitManager.name">
				<span>{{ itemPublishInfo.recruitManager.username }}</span>
				<el-button type="primary" @click="handleFindRecruitManager" size="small">查找</el-button>
			</el-form-item>
			<el-form-item label="项目负责人：" class="form-item" prop="projectManager.name">
				<span>{{ itemPublishInfo.projectManager.name }}</span>
				<el-button type="primary" @click="handleFindProjectManager" size="small">查找</el-button>
			</el-form-item>
			<h1 class="tips">财务设置</h1>
			<el-form-item label="利润提成（%）：" style="width: 700px;">
				<div v-if="isProfitRateEdit">
					<el-input-number v-model="itemPublishInfo.profitCommission" :min="0" :max="100" style="width: 130px;"></el-input-number>
					<el-button size="small" type="primary" @click.prevent="handleEditProfitRate">确认</el-button>
				</div>
				<div v-else>
					<span>{{ itemPublishInfo.profitCommission }}</span>
					<el-button size="small" type="primary" @click.prevent="handleEditProfitRate">修改</el-button>
				</div>
			</el-form-item>
			<el-form-item label="公司分成比例（%）：" style="width: 500px;">
				<el-input-number v-model="itemPublishInfo.companyDivided" :min="0" :max="100"></el-input-number>
			</el-form-item>
			<el-form-item label="风险激励金总额（元）：" style="width: 500px;">
				<el-input-number v-model="itemPublishInfo.riskIncentive" :min="0" :max="999999"></el-input-number>
			</el-form-item>
			<el-form-item label="月缴纳比例（%）：" style="width: 500px;">
				<el-input-number v-model="itemPublishInfo.monthPaymentRate" :min="0" :max="100"></el-input-number>
			</el-form-item>
			<h1 class="tips">班组管理</h1>
			<template>
				<div class="fullGroups">
					<div>
						全职班组管理
					</div>
					<el-button id="addGroups" @click="addFullTimeJob">添加班组</el-button>
				</div>
				<el-table class="deaital" :data="itemPublishInfo.fullTimeTeam" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column align="center" prop="fristJobName" label="一级岗位" width="120">
					</el-table-column>
					<el-table-column align="center" prop="secondJob" label="二级岗位" width="120">
					</el-table-column>
					<el-table-column align="center" prop="incomeType" label="收入模式" width="120" :formatter="formatIncomeType">
					</el-table-column>
					<el-table-column align="center" prop="receiveOrderAmount" label="接单价" width="200">
					</el-table-column>
					<el-table-column align="center" prop="sendOrderAmount" label="放单价" width="120">
					</el-table-column>
					<el-table-column align="center" prop="salary" label="日工资" width="120">
					</el-table-column>
					<el-table-column align="center" prop="overtimeAmount" label="超时单价" width="120">
					</el-table-column>
					<el-table-column align="center" prop="leaveAmount" label="请假单价" width="120">
					</el-table-column>
					<el-table-column align="center" prop="checkDayTime" label="核定日工资" width="120">
					</el-table-column>
					<el-table-column align="center" prop="fullTimeBonus" label="全勤奖" width="120">
					</el-table-column>
					<el-table-column align="center" prop="onTrialDaySalary" label="试用期工资" width="120">
					</el-table-column>
					<el-table-column align="center" prop="mealSupplement" label="餐补" width="160">
					</el-table-column>
					<el-table-column align="center" label="操作" width="160">
						<template scope="scope">
							<el-button size="small" type="primary" @click="changeFullTimeItem(scope.$index, scope.row)">修改</el-button>
							<el-button size="small" type="danger" @click="delteFullTimeItem(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<div class="fullGroups">
					<div>
						兼职班组管理
					</div>
					<el-button id="addGroups" @click="addPartTimeJob">添加班组</el-button>
				</div>
				<el-table class="deaital" :data="itemPublishInfo.partTimeTeam" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column align="center" prop="fristJobName" label="一级岗位" width="120">
					</el-table-column>
					<el-table-column align="center" prop="secondJob" label="二级岗位" width="120">
					</el-table-column>
					<el-table-column align="center" prop="incomeType" label="收入模式" width="120" :formatter="formatIncomeType">
					</el-table-column>
					<el-table-column align="center" prop="receiveOrderAmount" label="接单价" width="200">
					</el-table-column>
					<el-table-column align="center" prop="sendOrderAmount" label="放单价" width="120">
					</el-table-column>
					<el-table-column align="center" prop="salary" label="计时工资" width="120">
					</el-table-column>
					<!-- <el-table-column align="center" property="conditionList" label="计件工资" width="120">
					</el-table-column> -->
					<el-table-column align="center" label="操作">
						<template scope="scope">
							<el-button size="small" type="primary" @click="changePartTimeItem(scope.$index, scope.row)">修改</el-button>
							<el-button size="small" type="danger" @click="deletePartTimeItem(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<h1 class="tips"></h1>
			<el-form-item style="width: 500px;">
				<template scope="scope">
					<el-button type="primary" @click.native.prevent="handleSubmit" :loading="publishing">确认新建</el-button>
				</template>
			</el-form-item>
		</el-form>

		<el-dialog title="选择招聘前台" v-model="findRecruitManager">
			<el-input placeholder="请输入内容" v-model="searchContent">
				<el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 150px;">
					<el-option value='1' label='ID'></el-option>
					<el-option value='2' label='姓名'></el-option>
					<el-option value='3' label='身份证'></el-option>
					<el-option value='4' label='手机号'></el-option>
				</el-select>
				<el-button slot="append" icon="search" @click="getSearchRecruit"></el-button>
			</el-input>
			<div class="search-table">
				<el-table :data="searchData">
					<el-table-column property="id" label="id"></el-table-column>
					<el-table-column property="username" label="姓名"></el-table-column>
					<el-table-column property="idCard" label="身份证" width="200"></el-table-column>
					<el-table-column property="phone" label="手机" width="200"></el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button size="small" @click="handleConfirmRecruitManager(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<el-dialog title="选择项目负责人" v-model="findProjectManager">
			<el-input placeholder="请输入内容" v-model="searchContent">
				<el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 150px;">
					<el-option value='1' label='ID'></el-option>
					<el-option value='2' label='姓名'></el-option>
					<el-option value='3' label='身份证'></el-option>
					<el-option value='4' label='手机号'></el-option>
				</el-select>
				<el-button slot="append" icon="search" @click="getSearchProject"></el-button>
			</el-input>
			<div class="search-table">
				<el-table :data="searchData" v-loading="loading">
					<el-table-column property="id" label="id"></el-table-column>
					<el-table-column property="name" label="姓名"></el-table-column>
					<el-table-column property="idCard" label="身份证" width="200"></el-table-column>
					<el-table-column property="phone" label="手机" width="200"></el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button size="small" @click="handleConfirmProjectManager(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-col :span="24" style="margin-top:10px;">
					<el-pagination layout="prev, pager, next" @current-change="handlePageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
				</el-col>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { newProject } from '../../../store/groups_data';
	export default {
		name: 'itemNew',
		data() {
			return {
				itemPublishInfo: {
					managerId:'',
					recruitFronts:'',
					title:"",
				    userId:1,
				    profitCommission:'',
				    companyDivided:'',
				    riskIncentive: '',
					address: '',
					latitude: 30.2419557,
					longitude: 120.1273834,
					introduction: '',
					recruitManager: '',
					projectManager: '',
					monthPaymentRate: "",
					partTimeTeam: [{
						fristJobId: 1,
						fristJobName: "",
						secondJob: "",
						incomeType: 1,
						type: 0,
						receiveOrderAmount: "",
						sendOrderAmount: "",
						salary: "",
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
							numberCondition:''
						}]
					}],
					fullTimeTeam:[{
				    	fristJobId:1,
				    	fristJobName:"",
				    	secondJob:"",
				    	incomeType:1,
				    	type:1,
				    	receiveOrderAmount:"",
				    	sendOrderAmount:"",
				    	salary:"",
				    	leaveAmount:"",
				    	overtimeAmount:"",
				    	fullTimeBonus:"",
				    	fullTimeDays:"",
				    	mealSupplement:"",
				    	//核定日工资
				    	checkDayTime:'',
				    	conditionList:[{
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
				    }],
				    conditionList:{
				    	amount:10
				    },
					teamOfGroupData: [{
						oneLevelJob: '接单员',
						twoLevelJob: '分拣员',
						incomeMode: '计件',
						getOrderPrice: 22,
						giveOrderPrice: 19,
						lastEditTimeAt: new Date(parseInt(Date.now(), 10)).toLocaleString().replace(/:\d{1,2}$/, ' '),
					}],
				},

				editTeamOfGroupForm: {
					id: 0,
					oneLevelJob: '',
					twoLevelJob: '',
					incomeMode: '',
					getOrderPrice: 0,
					giveOrderPrice: 0,
				},
				mapConfig: {
					location: '',
					keyword: '',
					center: {
						lng: 120.1273834,
						lat: 30.2419557
					},
					zoom: 12,
				},
				currentPage: 1,
				pageSize: 20,
				pageCount: 0,
				loading: false,
				searchData: [],
				isProfitRateEdit: false,
				editTeamOfGroupVisible: false,
				publishing: false,
				findRecruitManager: false,
				findProjectManager: false,
				searchContent: '',
				searchType: '1',
				isMapShow: false,
				itemPublishRules: {
					title: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: '请输入项目地址',
						trigger: 'blur'
					}, ],
					introduction: [{
						required: true,
						message: '请输入项目描述',
						trigger: 'blur'
					}, ]
				},
			};
		},
		methods: {
			//全职班组修改按钮
			changeFullTimeItem(index,row){
				this.$router.push({
					name: 'adminItemGroups',
					params: {
						id: this.$route.params.id
					}
				});
			},
			//删除全职班组
			delteFullTimeItem(index, row){
				newProject.removeFullTime(index)
			},
			//删除兼职班组
			deletePartTimeItem(index, row){
				newProject.removePartTime(index)
			},
			changePartTimeItem(){
				this.$router.push({
					name: 'adminItempartGroups',
					params: {
						id: this.$route.params.id
					}
				});
			},
			addFullTimeJob() {
				this.$router.push({
					name: 'adminItemGroups',
					// query: {
					// 	id: this.$route.params.id
					// }
				});
			},
			addPartTimeJob(){
				this.$router.push({
					name: 'adminItempartGroups',
					// query: {
					// 	id: this.$route.params.id
					// }
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleEditProfitRate() {
				this.isProfitRateEdit = !this.isProfitRateEdit;
				if(this.itemPublishInfo.profitRate > 100 || this.itemPublishInfo.profitRate === '') {
					this.itemPublishInfo.profitRate = 100;
				} else if(this.itemPublishInfo.profitRate < 0) {
					this.itemPublishInfo.profitRate = 0;
				}
			},
			handleTeamOfGroupEdit(index, row) {
				console.log(index);
				console.log(row);
			},
			handleTeamOfGroupDelete(index, row) {
				console.log(index);
				console.log(row);
			},
			infohtmlset(poi) {
				this.itemPublishInfo.address = `${poi.city}${poi.address}${poi.title}`;
				this.itemPublishInfo.latitude = poi.point.lat;
				this.itemPublishInfo.longitude = poi.point.lng;
				this.isMapShow = false;
			},
			handleShowMap() {
				this.isMapShow = !this.isMapShow;
			},
			handleSubmit() {
				this.$refs.itemPublishForm.validate((valid) => {
					if(valid) {
						this.publishing = true;
						this.$http.post('/project/add', {
							managerId: this.itemPublishInfo.managerId,
							recruitFronts: this.itemPublishInfo.recruitFronts,
							title: this.itemPublishInfo.title,
							address: this.itemPublishInfo.address,
							introduction: this.itemPublishInfo.introduction,
							longitude: this.itemPublishInfo.longitude,
							latitude: this.itemPublishInfo.latitude,
							riskIncentive:this.itemPublishInfo.riskIncentive,
							companyDivided:this.itemPublishInfo.companyDivided,
							profitCommission:this.itemPublishInfo.profitCommission,
							monthPaymentRate:this.itemPublishInfo.monthPaymentRate,
							userId: this.itemPublishInfo.userId,
							partTimeTeam:this.itemPublishInfo.partTimeTeam,
							fullTimeTeam:this.itemPublishInfo.fullTimeTeam
						}).then((response) => {
							if(response.data.errorCode === 10000) {
								const {
									error,
									errorCode,
									moreInfo
								} = response.data;
								this.itemPublishInfo = response.data;
								this.$notify({
									title: '新建成功',
									type: 'success',
								});
								newProject.clear();
								this.$router.push('list');
							} else {
								this.$notify.error({
									title: `${moreInfo}`,
									type: 'success',
								});
							}
							this.publishing = false;
						}).catch((error) => {
							this.publishing = false;
							console.log(error);
						});
					}
					return false;
				});
			},
			handlePageChange(val) {
				if(this.findProjectManager) {
					this.currentPage = val;
					this.getSearchProject();
				}
				if(this.findRecruitManager) {
					this.currentPage = val;
					this.getSearchRecruit();
				}
			},
			handleFindProjectManager() {
				this.findProjectManager = true;
				this.searchData = [];
				this.getSearchProject();
			},
			handleFindRecruitManager() {
				this.findRecruitManager = true;
				this.searchData = [];
				this.getSearchRecruit();
			},
			getSearchRecruit() {
				this.searchData = [];
				let idData = '';
				let idCardData = '';
				let nameData = '';
				let telphoneData = '';
				if(this.searchType === '1') {
					idData = this.searchContent;
				} else if(this.searchType === '2') {
					nameData = this.searchContent;
				} else if(this.searchType === '3') {
					idCardData = this.searchContent;
				} else if(this.searchType === '4') {
					telphoneData = this.searchContent;
				}
				const params = {
					rolesId: 4,
					pageNum: this.currentPage,
					pageSize: this.pageSize,
					id: idData,
					idCard: idCardData,
					name: nameData,
					phone: telphoneData,
				};
				this.loading = true;
				this.$http.post('/admin/user/list', params).then((response) => {
					const {
						data: {
							list,
							pages,
							total,
							pageNum,
						},
					} = response.data;
					this.currentPage = pageNum;
					this.pageCount = pages;
					this.searchData = list;
					this.loading = false;
				}).catch((error) => {
					this.loading = false;
				});
			},
			getSearchProject() {
				this.searchData = [];
				let idData = '';
				let idCardData = '';
				let nameData = '';
				let telphoneData = '';
				if(this.searchType === '1') {
					idData = this.searchContent;
				} else if(this.searchType === '2') {
					nameData = this.searchContent;
				} else if(this.searchType === '3') {
					idCardData = this.searchContent;
				} else if(this.searchType === '4') {
					telphoneData = this.searchContent;
				}
				const params = {
					status: 0,
					pageNum: this.currentPage,
					pageSize: this.pageSize,
					id: idData,
					idCard: idCardData,
					name: nameData,
					phone: telphoneData,
				};
				this.loading = true;
				this.$http.post('/manager/list', params).then((response) => {
					const {
						data: {
							list,
							pages,
							total,
							pageNum,
						},
					} = response.data;
					this.currentPage = pageNum;
					this.pageCount = pages;
					this.searchData = list;
					this.loading = false;
				}).catch((error) => {
					this.loading = false;
				});
			},
			handleConfirmProjectManager(index, row) {
				this.itemPublishInfo.managerId = row.id;
				this.itemPublishInfo.projectManager = row;
				this.findProjectManager = false;
			},
			handleConfirmRecruitManager(index, row) {
				this.itemPublishInfo.recruitFronts = row.id;
				this.itemPublishInfo.recruitManager = row;
				this.findRecruitManager = false;
			},
			formatIncomeType(row, column) {
				if (row.incomeType === 0) {
					return '其他';
				} else if (row.incomeType === 1) {
					return '计时';
				}
				return '计件';
			}
		},
		mounted() {
			this.itemPublishInfo.fullTimeTeam = newProject.listFullTime;
			this.itemPublishInfo.partTimeTeam = newProject.listPartTime;
		}
	};
</script>

<style lang="scss" scoped>
	#itemNew {
		.fullGroups{
			width: 100%;
			height: 36px;
			padding: 10px 0 10px 0;
			line-height: 30px;
			display: flex;
			justify-content: flex-start;
			div {
				margin-right: 800px;
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
		.tips {
			border-bottom: 1px solid #e5e9f2;
		}
		.form-item {
			width: 600px;
			margin-left: 100px;
		}
		.search-table {
			margin-top: 30px;
			height: 340px;
			overflow-y: scroll;
		}
		.map-container {
			.bm-view {
				width: 100%;
				height: 400px;
			}
		}
	}
</style>
