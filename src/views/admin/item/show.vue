<template>
	<div id="itemShow">
		<el-dialog v-model="dialogFormVisible">
			<div class="addrecord">
				<div class="names_input">
					<span>姓名:</span>
					<el-input v-model="newRecord.name" placeholder="请输入姓名"></el-input>
				</div>
				<div class="names_input">
					<span class="padd_right">身份证号:</span>
					<el-input v-model="newRecord.idCard" placeholder="身份证号"></el-input>
				</div>
				<div class="addtimerecord">
					<span>一级岗位:</span>
					<el-select v-model="newRecord.fristJob" placeholder="请选择">
						<el-option v-for="item in options" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="addtimerecord">
					<span>二级岗位:</span>
					<el-select v-model="newRecord.secondJob" placeholder="请选择">
						<el-option v-for="item in options" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="addtimerecord">
					<span>日期:</span>
					<div class="block">
						<el-date-picker v-model="newRecord.time" placeholder="选择日期">
						</el-date-picker>
					</div>
				</div>
				<div class="addtimerecord">
					<span>上班时间:</span>
					<div class="block">
						<el-date-picker v-model="newRecord.startWorkTime" type="datetime" placeholder="上班时间">
						</el-date-picker>
					</div>
				</div>
				<div class="addtimerecord">
					<span>下班时间:</span>
					<div class="block">
						<el-date-picker v-model="newRecord.endWorkTime" type="datetime" placeholder="下班时间">
						</el-date-picker>
					</div>
				</div>
				<div class="addtimerecord">
					<span>工时:</span>
					<el-input-number v-model="newRecord.workHours" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="addtimerecord">
					<span>件数:</span>
					<el-input-number v-model="newRecord.number" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
				<div class="addtimerecord">
					<span>请假工时:</span>
					<el-input-number v-model="newRecord.leaveHours" @change="handleChange" :min="1" :max="10000"></el-input-number>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="closefindinout">确 定</el-button>
			</div>
		</el-dialog>
		<h4>项目ID: {{itemInfo.id}}，项目名称：{{itemInfo.title}}</h4>
		<el-tabs v-model="defaultTab" type="card" @tab-click="handleTabClick">
			<el-tab-pane label="项目信息" name="first">
				<el-form class="info" lable-width="200px">
					<h3 class="tips">基本信息</h3>
					<el-form-item label="项目名称：">{{ itemInfo.title }}</el-form-item>
					<el-form-item label="项目地址：">{{ itemInfo.address }}</el-form-item>
					<el-form-item label="项目介绍：">{{ itemInfo.introduction }}</el-form-item>
					<h3 class="tips">匹配负责人</h3>
					<el-form-item label="招聘前台：">{{ itemInfo.recruitFrontsName }}</el-form-item>
					<el-form-item label="项目经理：">{{ itemInfo.managerName }}</el-form-item>
					<h3 class="tips">财务设置</h3>
					<div id="upRetained">
						<span>利润提成：</span>
						<el-input-number v-model="num1" @change="handleChange" :min="1" :max="100"></el-input-number>
						<el-button class="marChange" type="primary">修改</el-button>
					</div>
					<div id="upRetained">
						<span>公司分成：</span>
						<el-input-number v-model="num2" :min="1" :max="100"></el-input-number>
					</div>
					<div id="upRetained">
						<span>风险激励金比例：</span>
						<el-input-number v-model="num3" :min="1" :max="100"></el-input-number>
					</div>

					<!---------班组管理------------>
					<h3 class="tips">班组管理</h3>
					<div class="fullGroups">
						<div>
							全职班组管理
						</div>

						<el-button id="addGroups" type="primary" @click="dialogVisible">添加班组</el-button>

					</div>
					<el-table class="deaital" :data="tableData8" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
						</el-table-column>
						<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
						</el-table-column>
						<el-table-column align="center" prop="incometype" label="收入模式" width="120">
						</el-table-column>
						<el-table-column align="center" prop="acceptprice" label="接单价" width="200">
						</el-table-column>
						<el-table-column align="center" prop="unclinchprice" label="放单价" width="120">
						</el-table-column>
						<el-table-column align="center" prop="daysalary" label="日工资" width="120">
						</el-table-column>
						<el-table-column align="center" prop="holidayunivalent" label="请假单价" width="120">
						</el-table-column>
						<el-table-column align="center" prop="overtimeunivalent" label="超时单价" width="120">
						</el-table-column>
						<el-table-column align="center" prop="jijianprice" label="计件单价" width="120">
						</el-table-column>
						<el-table-column align="center" prop="quanqinreward" label="全勤奖" width="120">
						</el-table-column>
						<el-table-column align="center" prop="foodcompensate" label="餐补" width="160">
						</el-table-column>
						<el-table-column align="center" prop="provide" label="操作" width="160">
						</el-table-column>
					</el-table>

					<div class="fullGroups">
						<div>
							兼职班组管理
						</div>

						<el-button id="addGroups" type="primary" @click="dialogVisible">添加班组</el-button>

					</div>
					<el-table class="deaital" :data="tableData9" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
						</el-table-column>
						<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
						</el-table-column>
						<el-table-column align="center" prop="incometype" label="收入模式" width="120">
						</el-table-column>
						<el-table-column align="center" prop="acceptprice" label="接单价" width="200">
						</el-table-column>
						<el-table-column align="center" prop="unclinchprice" label="放单价" width="120">
						</el-table-column>
						<el-table-column align="center" prop="hourssalary" label="计时工资" width="120">
						</el-table-column>
						<el-table-column align="center" prop="jiansalary" label="计件工资" width="120">
						</el-table-column>
						<el-table-column align="center" prop="provide" label="操作" width="120">
						</el-table-column>
					</el-table>
					<div class="worker_change">
						<el-button class="mar_right" type="primary">确定修改</el-button>
						<el-button type="primary">取消</el-button>
					</div>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="招聘需求管理" name="second">
				<el-tabs v-model="defaultDemandTab" @tab-click="handleDemandTabClick" v-loading="loading">
					<el-tab-pane label="待审核" name="first">
						<el-table :data="demands" :border='true' style="width: 100%;">
							<el-table-column prop="id" label="ID" align="center" width="100">
							</el-table-column>
							<el-table-column prop="job" label="岗位" align="center" width="150">
							</el-table-column>
							<el-table-column prop="title" label="需求表名" align="center" width="150">
							</el-table-column>
							<el-table-column prop="type" label="类型" :formatter="formatType" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyReason" label="申请原因" :formatter="formatReason" align="center" width="200">
							</el-table-column>
							<el-table-column prop="createdAt" :formatter="formatCreatedDate" label="申请时间" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyNumber" label="需求人数" align="center" width="100">
							</el-table-column>
							<el-table-column prop="updatedAt" label="处理时间" :formatter="formatUpdatedDate" align="center" width="200">
							</el-table-column>
							<el-table-column prop="type" label="招聘人数" align="center" width="100">
							</el-table-column>
							<el-table-column label="操作" width="400">
								<template scope="scope">
									<el-button size="small" @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
									<el-button size="small" type="danger" @click="handleRefusedDemand(scope.$index, scope.row)">驳回</el-button>
									<el-button size="small" type="primary" @click="handleProcessedDemand(scope.$index, scope.row)">处理</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="处理中" name="second" v-loading="loading">
						<el-table :data="demands" :border='true' style="width: 100%;">
							<el-table-column prop="id" label="ID" align="center" width="100">
							</el-table-column>
							<el-table-column prop="job" label="岗位" align="center" width="150">
							</el-table-column>
							<el-table-column prop="title" label="需求表名" align="center" width="150">
							</el-table-column>
							<el-table-column prop="type" label="类型" :formatter="formatType" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyReason" label="申请原因" :formatter="formatReason" align="center" width="200">
							</el-table-column>
							<el-table-column prop="createdAt" :formatter="formatCreatedDate" label="申请时间" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyNumber" label="需求人数" align="center" width="100">
							</el-table-column>
							<el-table-column prop="updatedAt" label="处理时间" :formatter="formatUpdatedDate" align="center" width="200">
							</el-table-column>
							<el-table-column prop="type" label="招聘人数" align="center" width="100">
							</el-table-column>
							<el-table-column label="操作" width="400">
								<template scope="scope">
									<el-button size="small" @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
									<el-button size="small" @click="handleApplyDemand(scope.$index, scope.row)">发布招聘计划</el-button>
									<el-button size="small" type="danger" @click="handleEndDemand(scope.$index, scope.row)">结束</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="已驳回" name="third">
						<el-table :data="demands" :border='true' style="width: 100%;">
							<el-table-column prop="id" label="ID" align="center" width="100">
							</el-table-column>
							<el-table-column prop="job" label="岗位" align="center" width="150">
							</el-table-column>
							<el-table-column prop="title" label="需求表名" align="center" width="150">
							</el-table-column>
							<el-table-column prop="type" label="类型" :formatter="formatType" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyReason" label="申请原因" :formatter="formatReason" align="center" width="200">
							</el-table-column>
							<el-table-column prop="createdAt" :formatter="formatCreatedDate" label="申请时间" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyNumber" label="需求人数" align="center" width="100">
							</el-table-column>
							<el-table-column prop="updatedAt" label="处理时间" :formatter="formatUpdatedDate" align="center" width="200">
							</el-table-column>
							<el-table-column prop="type" label="招聘人数" align="center" width="100">
							</el-table-column>
							<el-table-column label="操作" width="400">
								<template scope="scope">
									<el-button size="small" @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="已结束" name="fourth">
						<el-table :data="demands" :border='true' style="width: 100%;">
							<el-table-column prop="id" label="ID" align="center" width="100">
							</el-table-column>
							<el-table-column prop="job" label="岗位" align="center" width="150">
							</el-table-column>
							<el-table-column prop="title" label="需求表名" align="center" width="150">
							</el-table-column>
							<el-table-column prop="type" label="类型" :formatter="formatType" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyReason" label="申请原因" :formatter="formatReason" align="center" width="200">
							</el-table-column>
							<el-table-column prop="createdAt" :formatter="formatCreatedDate" label="申请时间" align="center" width="200">
							</el-table-column>
							<el-table-column prop="applyNumber" label="需求人数" align="center" width="100">
							</el-table-column>
							<el-table-column prop="updatedAt" label="处理时间" :formatter="formatUpdatedDate" align="center" width="200">
							</el-table-column>
							<el-table-column prop="type" label="招聘人数" align="center" width="100">
							</el-table-column>
							<el-table-column label="操作" width="400">
								<template scope="scope">
									<el-button size="small" @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-col :span="24" style="margin-top:10px;">
						<el-pagination v-if="demands.length > 0" layout="prev, pager, next" @current-change="handleDemandPageChange" :current-page="currentDemandPage" :page-count="demandPageCount" style="float: right;"></el-pagination>
					</el-col>
				</el-tabs>
			</el-tab-pane>
			<el-tab-pane label="全职管理" name="third">
				<el-tabs v-model="defaultDemandTab" @tab-click="handleFullTimeTab" v-loading="loading">
					<el-row v-if="fullTimeStaffs.length > 0">
						<el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
						<el-button style="float: right" @click="PrePage">上一页</el-button>
					</el-row>
					<el-tab-pane label="全部" name="first">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="待确认" name="second">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="待面试" name="third">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="待入职" name="fourth">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="入职中" name="fifth">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="已结束" name="sixth">
						<userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
				</el-tabs>
				<el-col :span="24" style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
					<el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
				</el-col>
			</el-tab-pane>
			<el-tab-pane label="兼职管理" name="fourth">
				<el-tabs v-model="defaultDemandTab" @tab-click="handlePartTimeTab" v-loading="loading">
					<el-row v-if="partTimeStaffs.length > 0">
						<el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
						<el-button style="float: right" @click="PrePage">上一页</el-button>
					</el-row>
					<el-tab-pane label="全部" name="first">
						<userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="待确认" name="second">
						<userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="待考勤" name="third">
						<userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="已考勤" name="fourth">
						<userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
					<el-tab-pane label="已结束" name="fifth">
						<userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info" :selectVisible="false" @handleDetail="handleDetail(this.event, info)" @handleConfirmInfo="handleConfirmInfo(this.event, info, index)" @handleInvalidInfo="handleInvalidInfo(this.event, info, index)" @handleInterviewPass="handleInterviewPass(this.event, info, index)" @handleInterviewRefused="handleInterviewRefused(this.event, info, index)" @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)" @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)" @handleWorkFailed="handleWorkFailed(this.event, info, index)" @handleConfirmWork="handleConfirmWork(this.event, info, index)" @handleDimission="handleDimission(this.event, info, index)" @handleSignIn="handleSignIn(this.event, info, index)" @handleRevertStatus="handleRevertStatus(this.event, info, index)" style="margin-top: 10px;">
							</userInfo>
					</el-tab-pane>
				</el-tabs>
				<el-col :span="24" style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
					<el-pagination layout="prev, pager, next" @current-change="handlePartTimeStaffPageChange" :current-page="currentPartTimeStaffPage" :page-count="partTimeStaffPageCount" style="float: right;"></el-pagination>
				</el-col>
			</el-tab-pane>
<!--------------------考勤管理----------------------->
			<el-tab-pane label="考情管理" name="fifth">
				<div class="block">
					<span class="wrapper">
					    <el-button type="primary" @click="dialogFormVisible = true">添加考勤记录</el-button>
					    <el-button type="primary">导入</el-button>
					    <el-button type="primary">清算</el-button>
					  </span>
				</div>

				<div class="search_back">
					<div>
						姓名：
						<el-input class="name_input" v-model="input" placeholder="请输入内容"></el-input>
					</div>
					<div>
						身份证号：
						<el-input class="idCard_input" v-model="input" placeholder="请输入内容"></el-input>
					</div>
					<el-button class="search_button" type="primary">查询记录</el-button>
				</div>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<!--------全部---------->
					<el-tab-pane label="全部" name="first">
						<el-button type="primary">批量删除</el-button>
						<el-button type="primary">批量清算</el-button>

						<el-table class="deaital" :data="addrecord" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" prop="fristJob" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="secondJob" label="二级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" porp="time" label="日期" width="120">
								<template scope="scope">{{ scope.row.time }}</template>
							</el-table-column>
							<el-table-column align="center" prop="startWorkTime" type="datetime" label="上班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="endWorkTime" type="datetime" label="下班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="workHours"  label="工时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="number" label="件数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="leaveHours" label="请假工时" width="120">
							</el-table-column>
							<el-table-column align="center" label="状态" width="120">
								<template scope="scope">
									<div >未清算</div>
								</template>	
							</el-table-column>
							<el-table-column align="center" label="操作" width="160">
								<template scope="scope">
									<el-button size="small" @click="changerecord(scope.$index, scope.row)">修改</el-button>
									<el-button size="small" type="danger" @click="deleterecord(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<!--------未清算---------->
					<el-tab-pane label="未清算" name="second">
						<el-button type="primary">批量删除</el-button>
						<el-button type="primary">批量清算</el-button>
						<el-table class="deaital" :data="tableData1" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" label="日期" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>

							<el-table-column align="center" prop="onbantime" label="上班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="upbantime" label="下班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="workhousers" label="工时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="件数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="holidayhousers" label="请假工时" width="120">
							</el-table-column>
							<el-table-column align="center" label="状态" width="120">
								<template scope="scope">
									<div >未清算</div>
								</template>
							</el-table-column>
							<el-table-column align="center" label="操作" width="160">
								<template scope="scope">
									<el-button size="small" @click="changerecord(scope.$index, scope.row)">修改</el-button>
									<el-button size="small" type="danger" @click="deleterecord(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<!--------清算---------->
					<el-tab-pane label="清算" name="third">
						<el-button type="primary">批量删除</el-button>
						<el-button type="primary">批量清算</el-button>
						<el-table class="deaital" :data="tableData2" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" label="日期" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>

							<el-table-column align="center" prop="onbantime" label="上班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="upbantime" label="下班时间" width="120">
							</el-table-column>
							<el-table-column align="center" prop="workhousers" label="工时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="件数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="holidayhousers" label="请假工时" width="120">
							</el-table-column>
							<el-table-column align="center" label="状态" width="120">
								<template scope="scope">
									<div >清算</div>
								</template>
							</el-table-column>
							<el-table-column align="center" label="操作" width="160">
								<template scope="scope">
									<el-button size="small" @click="changerecord(scope.$index, scope.row)">修改</el-button>
									<el-button size="small" type="danger" @click="deleterecord(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>

			</el-tab-pane>

			<!--//全职工资管理-->
			<el-tab-pane label="全职工资管理" name="sixth">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<!--全职未发放------->
					<el-tab-pane label="全职未发放" name="first">
						<div class="fullprovide">
							<el-select id="gangwei" v-model="value4" clearable placeholder="一级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select id="gangwei" v-model="value4" clearable placeholder="二级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input id="fullName_input" v-model="input" placeholder="姓名:"></el-input>
							<el-input id="fullName_input" v-model="input" placeholder="身份证号:"></el-input>
							<el-button id="search_find" type="primary">查询工资条</el-button>
							<el-button id="search_find" type="primary">全部发放</el-button>
						</div>
						<el-button type="primary">批量发放</el-button>
						<el-table class="deaital" :data="tableData4" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" label="月份" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>
							</el-table-column>
							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="employ" label="试用天数" width="120">
							</el-table-column>

							<el-table-column align="center" prop="banday" label="上班天数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="overtime" label="超时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="计件" width="120">
							</el-table-column>
							<el-table-column align="center" prop="alltime" label="全勤" width="120">
							</el-table-column>

							<el-table-column align="center" prop="allowance" label="等级津贴" width="120">
							</el-table-column>
							<el-table-column align="center" prop="changewance" label="管理津贴" width="120">
							</el-table-column>
							<el-table-column align="center" prop="foodcompensate" label="餐补" width="120">
							</el-table-column>
							<el-table-column align="center" prop="reward" label="奖励" width="120">
							</el-table-column>
							<el-table-column align="center" prop="administrative" label="处罚" width="120">
							</el-table-column>
							<el-table-column align="center" prop="mouthsalary" label="月工资" width="120">
							</el-table-column>
							<el-table-column align="center" prop="hotdaycost" label="高温费" width="160">
							</el-table-column>
							<el-table-column align="center" prop="withhold" label="扣款" width="120">
							</el-table-column>
							<el-table-column align="center" prop="koushebao" label="代扣社保" width="120">
							</el-table-column>
							<el-table-column align="center" prop="selfshui" label="代扣个税" width="160">
							</el-table-column>
							<el-table-column align="center" prop="realitymoney" label="实发金额" width="120">
							</el-table-column>
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
							</el-table-column>
						</el-table>

					</el-tab-pane>

					<el-tab-pane label="全职已发放" name="second">
						<div class="fullprovide">
							<el-select id="gangwei" v-model="value4" clearable placeholder="一级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select id="gangwei" v-model="value4" clearable placeholder="二级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input id="fullName_input" v-model="input" placeholder="姓名:"></el-input>
							<el-input id="fullName_input" v-model="input" placeholder="身份证号:"></el-input>
							<el-button id="search_find" type="primary">查询工资条</el-button>
							<el-button id="search_find" type="primary">全部发放</el-button>
						</div>
						<el-button type="primary">批量发放</el-button>
						<el-table class="deaital" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" label="月份" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>
							</el-table-column>
							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="employ" label="试用天数" width="120">
							</el-table-column>

							<el-table-column align="center" prop="banday" label="上班天数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="overtime" label="超时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="计件" width="120">
							</el-table-column>
							<el-table-column align="center" prop="alltime" label="全勤" width="120">
							</el-table-column>

							<el-table-column align="center" prop="allowance" label="等级津贴" width="120">
							</el-table-column>
							<el-table-column align="center" prop="changewance" label="管理津贴" width="120">
							</el-table-column>
							<el-table-column align="center" prop="foodcompensate" label="餐补" width="120">
							</el-table-column>
							<el-table-column align="center" prop="reward" label="奖励" width="120">
							</el-table-column>
							<el-table-column align="center" prop="administrative" label="处罚" width="120">
							</el-table-column>
							<el-table-column align="center" prop="mouthsalary" label="月工资" width="120">
							</el-table-column>
							<el-table-column align="center" prop="hotdaycost" label="高温费" width="160">
							</el-table-column>
							<el-table-column align="center" prop="withhold" label="扣款" width="120">
							</el-table-column>
							<el-table-column align="center" prop="koushebao" label="代扣社保" width="120">
							</el-table-column>
							<el-table-column align="center" prop="selfshui" label="代扣个税" width="160">
							</el-table-column>
							<el-table-column align="center" prop="realitymoney" label="实发金额" width="120">
							</el-table-column>
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
			<!--兼职工资管理-->
			<el-tab-pane label="兼职工资管理" name="seventh">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<!------兼职未发放------->
					<el-tab-pane label="兼职未发放" name="first">
						<div class="fullprovide">
							<el-select id="gangwei" v-model="value4" clearable placeholder="一级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select id="gangwei" v-model="value4" clearable placeholder="二级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input id="fullName_input" v-model="input" placeholder="姓名:"></el-input>
							<el-input id="fullName_input" v-model="input" placeholder="身份证号:"></el-input>
							<el-button id="search_find" type="primary">查询工资条</el-button>
							<el-button id="search_find" type="primary">全部发放</el-button>
						</div>
						<el-button type="primary">批量发放</el-button>
						<el-table class="deaital" :data="tableData5" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" label="月份" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>

							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>

							<el-table-column align="center" prop="workhousers" label="工时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="件数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="reward" label="奖励" width="120">
							</el-table-column>
							<el-table-column align="center" prop="administrative" label="处罚" width="120">
							</el-table-column>
							<el-table-column align="center" prop="foodcompensate" label="餐补" width="120">
							</el-table-column>
							<el-table-column align="center" prop="mouthsalary" label="工资" width="120">
							</el-table-column>
							<el-table-column align="center" prop="withhold" label="扣款" width="120">
							</el-table-column>
							<el-table-column align="center" prop="realitymoney" label="实发金额" width="120">
							</el-table-column>
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
							</el-table-column>
						</el-table>

					</el-tab-pane>
					<!----------兼职已发放-------------->
					<el-tab-pane label="兼职已发放" name="second">
						<div class="fullprovide">
							<el-select id="gangwei" v-model="value4" clearable placeholder="一级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select id="gangwei" v-model="value4" clearable placeholder="二级岗位">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input id="fullName_input" v-model="input" placeholder="姓名:"></el-input>
							<el-input id="fullName_input" v-model="input" placeholder="身份证号:"></el-input>
							<el-button id="search_find" type="primary">查询工资条</el-button>
							<el-button id="search_find" type="primary">全部发放</el-button>
						</div>
						<el-button type="primary">批量发放</el-button>
						<el-table class="deaital" :data="tableData6" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column align="center" prop="name" label="姓名" width="120">
							</el-table-column>
							<el-table-column align="center" prop="idCard" label="身份证号" width="200">
							</el-table-column>
							<el-table-column align="center" label="月份" width="120">
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>

							<el-table-column align="center" prop="quarters" label="一级岗位" width="120">
							</el-table-column>
							<el-table-column align="center" prop="quarters2" label="二级岗位" width="120">
							</el-table-column>

							<el-table-column align="center" prop="workhousers" label="工时" width="120">
							</el-table-column>
							<el-table-column align="center" prop="piecework" label="件数" width="120">
							</el-table-column>
							<el-table-column align="center" prop="reward" label="奖励" width="120">
							</el-table-column>
							<el-table-column align="center" prop="administrative" label="处罚" width="120">
							</el-table-column>
							<el-table-column align="center" prop="foodcompensate" label="餐补" width="120">
							</el-table-column>
							<el-table-column align="center" prop="mouthsalary" label="工资" width="120">
							</el-table-column>
							<el-table-column align="center" prop="withhold" label="扣款" width="120">
							</el-table-column>
							<el-table-column align="center" prop="realitymoney" label="实发金额" width="120">
							</el-table-column>
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
			<el-tab-pane label="项目收支管理" name="eighth">
				<div id="itemPayinit">
					<div class="block">
						<el-date-picker v-model="value4" type="month" placeholder="2016年6月">
						</el-date-picker>
					</div>
					<el-button id="search_find" type="primary">结算当月</el-button>
					<el-button id="search_find" type="primary">添加当月收支</el-button>

				</div>

				<!--Echarts图表展示月支出或收入--->
				<div id="payCircle">
					<div id="chartone"></div>
					<div id="charttwo"></div>
					<div id="chartthree"></div>
				</div>
				<div id="chartdeaital">
					<div>
						项目利润：
						<span>1000万元</span>&nbsp;&nbsp;&nbsp; 同比增长：
						<span>80%↑</span>
					</div>
					<div>
						项目收入：
						<span>1000万元</span>&nbsp;&nbsp;&nbsp; 同比增长：
						<span>80%↑</span>
					</div>
					<div>
						项目支出：
						<span>1000万元</span>&nbsp;&nbsp;&nbsp; 同比增长：
						<span>80%↑</span>
					</div>
				</div>
				<el-table class="deaital" :data="tableData7" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column align="center" label="时间" width="220" height="60">
						<template scope="scope">{{ scope.row.date }}</template>
					</el-table-column>
					<el-table-column align="center" prop="styles" label="类型" width="220">
					</el-table-column>
					<el-table-column align="center" prop="mouthsalary" label="金额" width="220">
					</el-table-column>
					<el-table-column align="center" prop="provideren" label="操作人" width="220">
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import util from '../../../common/util';
	import userInfo from '../../../components/userInfo';
	import echarts from '../../../common/echarts';
	import { newProject } from '../../../store/data';
	export default {
		name: 'itemShow',
		components: {
			userInfo,
		},
		data() {
			return {
				chartone: null,
				charttwo: null,
				chartthree: null,
				num1: 1,
				num2: 1,
				num3: 1,
				dialogFormVisible: false,
				deleterecod:{
					id:''
				},
				value3: new Date(2016, 9, 10, 18, 40),
				options: [{
					label: '一级班组',
					value: '一级班组'
				}, {
					label: '二级班组',
					value: '二级班组'
				}, {
					label: '三级班组',
					value: '三级班组'
				}, {
					label: '四级班组',
					value: '四级班组'
				}, {
					label: '五级班组',
					value: '五级班组'
				}],
				newRecord: {
					projectId:'',
					name:"",
					idCard:'',
					fristJobId:1,
					fristJob:"",
					secondJobId:1,
					secondJob:"",
					time:"",
					workHours:'',
					leaveHours:'',
					startWorkTime:'',
					endWorkTime:'',
					number:''
				},
				addrecord:[{
					projectId:'',
					name:"",
					idCard:'',
					fristJobId:1,
					fristJob:"",
					secondJobId:1,
					secondJob:"",
					time:"",
					workHours:'',
					leaveHours:'',
					startWorkTime:'',
					endWorkTime:'',
					number:''
				}],
				getRecorddata:{
					list:{
						createdAt:'',
						endWorkTime:'',
						fristJob:"",
						fristJobId:'',
						id:'',
						idCard:'',
						leaveHours:'',
						name:"",
						number:'',
						projectId:'',
						secondJob:'',
						secondJobId:'',
						startWorkTime:'',
						status:'',
						time:'',
						updatedAt:'',
						workHours:''
					}
				},
				tableData0: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime: "9:00",
					upbantime: "18:00",
					//工时
					workhousers: "4",
					//件数
					piecework: "56",
					holidayhousers: "12",
					status: "未清算",
					provide: "修改 删除"
				}],
				tableData1: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime: "9:00",
					upbantime: "18:00",
					//工时
					workhousers: "4",
					//件数
					piecework: "56",
					holidayhousers: "12",
					status: "未清算",
					provide: "修改 删除"
				}],
				tableData2: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime: "9:00",
					upbantime: "18:00",
					//工时
					workhousers: "4",
					//件数
					piecework: "56",
					holidayhousers: "12",
					status: "清算",
					provide: "修改 删除"
				}],
				tableData3: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					employ: "7",
					banday: "9",
					overtime: "4",
					//计件
					piecework: "56",
					alltime: "300",
					//等级津贴
					allowance: "300",
					//管理津贴
					changewance: "500",
					//餐补
					foodcompensate: "400",
					//奖励
					reward: "添加",
					//处罚
					administrative: "添加",
					mouthsalary: "3500",
					hotdaycost: "100",
					//扣款
					withhold: "添加",
					//扣社保
					koushebao: "00",
					//个人税
					selfshui: "00",
					//实发金额
					realitymoney: "5000",
					status: "已发放",
					provide: "发放"
				}],
				tableData4: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					employ: "7",
					banday: "9",
					overtime: "4",
					//计件
					piecework: "56",
					alltime: "300",
					//等级津贴
					allowance: "300",
					//管理津贴
					changewance: "500",
					//餐补
					foodcompensate: "400",
					//奖励
					reward: "添加",
					//处罚
					administrative: "添加",
					mouthsalary: "3500",
					hotdaycost: "100",
					//扣款
					withhold: "添加",
					//扣社保
					koushebao: "00",
					//个人税
					selfshui: "00",
					//实发金额
					realitymoney: "5000",
					status: "未发放",
					provide: "发放"
				}],
				tableData5: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					//工时
					workhousers: "4",
					//计件
					piecework: "56",
					//奖励
					reward: "添加",
					//处罚
					administrative: "添加",
					//餐补
					foodcompensate: "400",
					mouthsalary: "3500",
					//扣款
					withhold: "添加",
					//实发金额
					realitymoney: "5000",
					status: "未发放",
					provide: "发放"
				}],
				tableData6: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					//工时
					workhousers: "4",
					//计件
					piecework: "56",
					//奖励
					reward: "添加",
					//处罚
					administrative: "添加",
					//餐补
					foodcompensate: "400",
					mouthsalary: "3500",
					//扣款
					withhold: "添加",
					//实发金额
					realitymoney: "5000",
					status: "已发放",
					provide: "发放"
				}],
				tableData7: [{
						date: "17年6月",
						styles: "增加奖励",
						mouthsalary: "3500",
						provideren: "紫漠大仙"
					},
					{
						date: "17年6月",
						styles: "增加奖励",
						mouthsalary: "3500",
						provideren: "紫漠大仙"
					}
				],
				tableData8: [{
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					incometype: "计时",
					acceptprice: "40",
					unclinchprice: "30",
					daysalary: "100",
					//请假单价
					holidayunivalent: "10",
					//超时单价
					overtimeunivalent: "8",
					jijianprice: "4",
					quanqinreward: "80",
					//餐补
					foodcompensate: "80",
					provide: "修改 操作"
				}],
				tableData9: [{
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					incometype: "计件",
					acceptprice: "40",
					unclinchprice: "30",
					hourssalary: "100",
					jiansalary: "80",
					provide: "修改 删除"
				}],
				multipleSelection: [],
				activeName: 'second',
				input: '',
				itemInfo: {
					id: '',
					title: '',
				},
				demands: [],
				fullTimeStaffs: [],
				partTimeStaffs: [],
				currentTab: 'first',
				defaultTab: 'first',
				defaultDemandTab: 'first',
				loading: false,
				currentDemandPage: 1,
				demandPageCount: 0,
				currentDemandStatus: 0,
				currentUserType: 1,
				currentUserStatus: 0,
				currentFullTimeStaffPage: 1,
				fullTimeStaffPageCount: 0,
				currentPartTimeStaffPage: 1,
				partTimeStaffPageCount: 0,
				pageSize: 10,
				value4: '',
				modifyRecord:[{
					id:'',
					projectId:'',
					name:'',
					idCard:'',
					fristJobId:'',
					fristJob:"",
					secondJobId:'',
					secondJob:'',
					time:'',
					workHours:'',
					leaveHours:'',
					startWorkTime:'',
					endWorkTime:'',
					number:''	
				}],
				recordListShow:{
					name:'',
					idCard:'',
					status:0,
					pageNum:'',
					pageSize:''
				}
			};

		},
		methods: {
			//获取考勤列表
			getrecordList(){
				const params = {
					name: this.recordListShow.name,
					idCard:this.recordListShow.idCard,
					status:this.recordListShow.status,
					pageNum:this.recordListShow.pageNum,
					pageSize:this.recordListShow.pageSize,					
				};
				this.$http.post('/attendance/list', params).then((response) => {
					if(response.data.errorCode === 10000) {
						const {
							name,
							idCard,
							pageNum,
							pageSize
						} = response.data.data;
					} else {
						this.$notify.error({
							title: '获取数据失败',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			//格式化时间
//			formatDate(row, column) {
//				const date = new Date(parseInt(row.startWorkTime, 0));
//				return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm:ss');
//			},
			//添加考勤记录
			closefindinout(){
				this.dialogFormVisible = false;
				const params = {
					projectId:this.itemInfo.id,
					name:this.newRecord.name,
					idCard:this.newRecord.idCard,
					fristJobId:this.newRecord.fristJobId,
					fristJob:this.newRecord.fristJob,
					secondJobId:this.newRecord.secondJobId,
					secondJob:this.newRecord.secondJob,
					time:this.newRecord.time,
					workHours:this.newRecord.workHours,
					startWorkTime:this.newRecord.startWorkTime,
					endWorkTime:this.newRecord.endWorkTime,
					number:this.newRecord.number,
					leaveHours:this.newRecord.leaveHours					
				};
				this.$http.post('/attendance/add', params).then((response) => {
					if(response.data.errorCode === 10000) {
						this.addrecord.push(this.newRecord)
						this.newRecord = {
							projectId:'',
							name:"",
							idCard:'',
							fristJobId:'',
							fristJob:"",
							secondJobId:'',
							secondJob:"",
							time:"",
							workHours:'',
							leaveHours:'',
							startWorkTime:'',
							endWorkTime:'',
							number:''
						}
//						newProject.listRecord.push(this.addrecord);
						this.getrecordList();
						this.$notify({
							title: "添加成功",
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
			//修改考勤记录
			changerecord(index, row) {
				const params = {
					id:this.modifyRecord.id,
					projectId:this.modifyRecord.projectId,
					name:this.modifyRecord.name,
					idCard:this.modifyRecord.idCard,
					fristJobId:this.modifyRecord.fristJobId,
					fristJob:this.modifyRecord.fristJob,
					secondJobId:this.modifyRecord.secondJobId,
					secondJob:this.modifyRecord.secondJob,
					time:this.modifyRecord.time,
					workHours:this.modifyRecord.workHours,
					leaveHours:this.modifyRecord.leaveHours,
					startWorkTime:this.modifyRecord.startWorkTime,
					endWorkTime:this.modifyRecord.endWorkTime,
					number:this.modifyRecord.number,		
				};
				this.$http.post('/attendance/modify', params).then((response) => {
					if(response.data.errorCode === 10000) {
						
						this.$notify({
							title: "修改成功",
							type: 'success',
						});
					 this.deleterecod.splice(index, 1);
					} else {
						this.$notify.error({
							title: '修改失败',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});	
			},
			//删除考勤记录
			deleterecord(index, row) {
				const params = {
					id:row.id				
				};
				this.$http.post('/attendance/delete', params).then((response) => {
					if(response.data.errorCode === 10000) {
						this.deleterecod.id = row.id
						this.$notify({
							title: "删除成功",
							type: 'success',
						});
					 this.deleterecod.splice(index, 1);
					} else {
						console.log(index);
						console.log(row);
						this.$notify.error({
							title: '删除失败',
							type: 'success',
						});
					}
				}).catch((error) => {
					console.log(error);
				});	
				
			},
			handleChange(value) {
				console.log(value);
			},
			dialogVisible() {
				const params = {

				}
				this.$router.push({
					name: 'adminItemGroups',
					params: {
						id: this.$route.params.id
					}
				});
			},
			handleChange(value) {
				console.log(value);
			},
			handleSelectionChange(val) {

				this.multipleSelection = val;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			// Tab切换
			handleTabClick(val) {
				this.currentTab = val.name;
				if(this.currentTab === 'second') {
					this.currentDemandStatus = 0;
					this.getDemands();
				} else if(this.currentTab === 'third') {
					this.currentUserType = 1;
					this.currentUserStatus = '';
					this.getUsers();
				} else if(this.currentTab === 'fourth') {
					this.currentUserType = 0;
					this.currentUserStatus = '';
					this.getUsers();
				}
			},
			// 需求 Tab 切换
			handleDemandTabClick(val) {
				if(val.name === 'first') {
					this.currentDemandStatus = 0;
				} else if(val.name === 'second') {
					this.currentDemandStatus = 1;
				} else if(val.name === 'third') {
					this.currentDemandStatus = 2;
				} else if(val.name === 'fourth') {
					this.currentDemandStatus = 3;
				} else if(val.name === 'fifth') {
					this.currentDemandStatus = 4;
				}
				this.getDemands();
			},
			// 用户 Tab 切换
			handleFullTimeTab(val) {
				if(val.name === 'first') {
					this.currentUserStatus = '';
				} else if(val.name === 'second') {
					this.currentUserStatus = 0;
				} else if(val.name === 'third') {
					this.currentUserStatus = 2;
				} else if(val.name === 'fourth') {
					this.currentUserStatus = 3;
				} else if(val.name === 'fifth') {
					this.currentUserStatus = 7;
				} else if(val.name === 'sixth') {
					this.currentUserStatus = 11;
				}
				this.getUsers();
			},
			handlePartTimeTab(val) {
				if(val.name === 'first') {
					this.currentUserStatus = '';
				} else if(val.name === 'second') {
					this.currentUserStatus = 0;
				} else if(val.name === 'third') {
					this.currentUserStatus = 2;
				} else if(val.name === 'fourth') {
					this.currentUserStatus = 10;
				} else if(val.name === 'fifth') {
					this.currentUserStatus = 11;
				}
				this.getUsers();
			},
			NextPage() {
				if(this.currentUserType === 1) {
					if(this.fullTimeStaffPageCount > this.currentFullTimeStaffPage) {
						this.currentFullTimeStaffPage += 1;
					}
				}
				if(this.currentUserType === 0) {
					if(this.partTimeStaffPageCount > this.currentPartTimeStaffPage) {
						this.currentPartTimeStaffPage += 1;
					}
				}
			},
			PrePage() {
				if(this.currentUserType === 1) {
					if(this.currentFullTimeStaffPage !== 1 &&
						this.fullTimeStaffPageCount >= this.currentFullTimeStaffPage) {
						this.currentFullTimeStaffPage -= 1;
					}
				}
				if(this.currentUserType === 0) {
					if(this.currentPartTimeStaffPage !== 1 &&
						this.partTimeStaffPageCount >= this.currentPartTimeStaffPage) {
						this.currentPartTimeStaffPage -= 1;
					}
				}
			},
			handleDemandPageChange(val) {
				this.currentDemandPage = val;
				this.getDemands();
			},
			handleFullTimeStaffPageChange(val) {
				this.currentFullTimeStaffPage = val;
				this.getUsers();
			},
			handlePartTimeStaffPageChange(val) {
				this.currentPartTimeStaffPage = val;
				this.getUsers();
			},
			handleDemandDetail(index, row) {
				this.$router.push({
					name: 'adminDemandShow',
					params: {
						id: row.id
					}
				});
			},
			handleRefusedDemand(index, row) {
				this.handleEditDemandStatus(row, 2, index, '已驳回');
			},
			handleEndDemand(index, row) {
				this.handleEditDemandStatus(row, 3, index, '已结束');
			},
			handleProcessedDemand(index, row) {
				this.handleEditDemandStatus(row, 1, index, '已处理');
			},
			handleApplyDemand(index, row) {
				this.$router.push({
					name: 'adminDemandShow',
					params: {
						id: row.id
					}
				});
			},
			handleEditDemandStatus(obj, currentStatus, index, msg) {
				const params = {
					id: obj.id,
					status: currentStatus,
				};
				this.$http.post('/demand/modifyStatus', params).then((response) => {
					if(response.data.errorCode === 10000) {
						this.$notify({
							title: msg,
							type: 'success',
						});
						this.demands.splice(index, 1);
					} else {
						this.$notify.error({
							title: '修改异常',
							type: 'success',
						});
					}
				}).catch((error) => {});
			},
			handleDetail(event, obj) {
				// window.open(`#/user/${obj.talent.id}`, 'target_blank');
				this.$router.push({
					name: 'adminUserShow',
					params: {
						id: obj.talent.id
					}
				});
			},
			handleInvalidInfo(event, obj, index) {
				this.handleEditUserStatus(obj, 1, index, '名单无效');
			},
			handleConfirmInfo(event, obj, index) {
				this.handleEditUserStatus(obj, 2, index, '确认名单');
			},
			handleInterviewPass(event, obj, index) {
				this.handleEditUserStatus(obj, 3, index, '面试通过');
			},
			handleInterviewRefused(event, obj, index) {
				this.handleEditUserStatus(obj, 4, index, '面试不通过');
			},
			handleInterviewAbsent(event, obj, index) {
				this.handleEditUserStatus(obj, 5, index, '面试未到');
			},
			handleWorkFailed(event, obj, index) {
				this.handleEditUserStatus(obj, 6, index, '入职失败');
			},
			handleConfirmWork(event, obj, index) {
				this.handleEditUserStatus(obj, 7, index, '确认入职');
			},
			handleDimission(event, obj, index) {
				this.handleEditUserStatus(obj, 8, index, '确认离职');
			},
			handlePartTimeAbsent(event, obj, index) {
				this.handleEditUserStatus(obj, 9, index, '放鸽子');
			},
			handleSignIn(event, obj, index) {
				this.handleEditUserStatus(obj, 10, index, '已考勤');
			},
			handleRevertStatus(event, obj, index) {
				this.$http.post(`/talent/restoreStatus?id=${obj.id}`).then((response) => {
					if(response.data.errorCode === 10000) {
						this.$notify({
							title: '已恢复',
							type: 'success',
						});
						if(this.currentUserType === 1) {
							this.fullTimeStaffs.splice(index, 1);
						}
						if(this.currentUserType === 0) {
							this.partTimeStaffs.splice(index, 1);
						}
					} else {
						this.$notify.error({
							title: '修改异常',
							type: 'success',
						});
					}
				}).catch((err) => {

				});
			},
			handleEditUserStatus(obj, currentStatus, index, msg) {
				const params = {
					id: obj.id,
					talentStatus: currentStatus,
				};
				this.$http.post('/talent/updateStatus', params).then((response) => {
					if(response.data.errorCode === 10000) {
						this.$notify({
							title: msg,
							type: 'success',
						});
						if(this.currentUserType === 1) {
							this.fullTimeStaffs.splice(index, 1);
						}
						if(this.currentUserType === 0) {
							this.partTimeStaffs.splice(index, 1);
						}
					} else {
						this.$notify.error({
							title: '修改异常',
							type: 'success',
						});
					}
				}).catch((error) => {});
			},
			// 数据获取
			getDemands() {
				this.loading = true;
				const params = {
					pageNum: this.currentDemandPage,
					pageSize: this.pageSize,
					projectId: this.$route.params.id,
					status: this.currentDemandStatus,
				};
				this.$http.post('/demand/list', params).then((response) => {
					const {
						data: {
							list,
							pages,
							pageNum,
						},
					} = response.data;
					this.currentDemandPage = pageNum;
					this.demandPageCount = pages;
					this.demands = list;
					this.loading = false;
				}).catch((err) => {
					this.loading = false;
					this.$message.error('获取数据失败');
				});
			},
			getUsers() {
				const projectId = this.$route.params.id;
				let params = {};
				if(this.currentUserType === 1) {
					params = {
						pageNum: this.currentFullTimeStaffPage,
						pageCount: this.fullTimeStaffPageCount,
						pageSize: this.pageSize,
						projectId: this.$route.params.id,
						talentStatus: this.currentUserStatus,
						type: this.currentUserType,
					};
				}
				if(this.currentUserType === 0) {
					params = {
						pageNum: this.currentPartTimeStaffPage,
						pageCount: this.partTimeStaffPageCount,
						pageSize: this.pageSize,
						projectId: this.$route.params.id,
						talentStatus: this.currentUserStatus,
						type: this.currentUserType,
					};
				}
				this.loading = true;
				this.$http.post('/project/talent/list', params).then((response) => {
					const {
						data: {
							list,
							pages,
							pageNum,
						},
					} = response.data;
					if(this.currentUserType === 0) {
						this.currentPartTimeStaffPage = pageNum;
						this.partTimeStaffPageCount = pages;
						this.partTimeStaffs = list;
					}
					if(this.currentUserType === 1) {
						this.currentFullTimeStaffPage = pageNum;
						this.fullTimeStaffPageCount = pages;
						this.fullTimeStaffs = list;
					}
					this.loading = false;
				}).catch((error) => {
					this.loading = false;
				});
			},
			formatCreatedDate(row, column) {
				// const date = new Date(parseInt(row.createdTime, 0) * 1000);
				const date = new Date(parseInt(row.createdAt, 0));
				return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
			},
			formatUpdatedDate(row, column) {
				// const date = new Date(parseInt(row.createdTime, 0) * 1000);
				const date = new Date(parseInt(row.updatedAt, 0));
				return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
			},
			formatType(row, column) {
				return row.type === 1 ? '全职' : '兼职';
			},
			formatReason(row, column) {
				if(row.applyReason === 0) {
					return '离职补缺';
				} else if(row.applyReason === 1) {
					return '新增职位';
				} else if(row.applyReason === 2) {
					return '业务发展扩编';
				} else if(row.applyReason === 3) {
					return '临时补充';
				}
				return '';
			},
			apps() {
				this.chartone = echarts.init(document.getElementById('chartone'));
				this.charttwo = echarts.init(document.getElementById('charttwo'));
				this.chartthree = echarts.init(document.getElementById('chartthree'));
				this.chartone.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						//data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [{
						name: '数据来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data: [{
								value: 335,
								name: '公司收入分成'
							},
							{
								value: 310,
								name: '缴税'
							},
							{
								value: 234,
								name: '兼职工资发放'
							},
							{
								value: 135,
								name: '招聘佣金支出'
							},
							{
								value: 1548,
								name: '全职工资支出'
							}
						]
					}]
				});
				this.charttwo.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						//						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [{
						name: '数据来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data: [{
								value: 335,
								name: '公司收入分成'
							},
							{
								value: 310,
								name: '缴税'
							},
							{
								value: 234,
								name: '兼职工资发放'
							},
							{
								value: 135,
								name: '招聘佣金支出'
							},
							{
								value: 1548,
								name: '全职工资支出'
							}
						]
					}]
				});
				this.chartthree.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						//data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [{
						name: '数据来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data: [{
								value: 335,
								name: '公司收入分成'
							},
							{
								value: 310,
								name: '缴税'
							},
							{
								value: 234,
								name: '兼职工资发放'
							},
							{
								value: 135,
								name: '招聘佣金支出'
							},
							{
								value: 1548,
								name: '全职工资支出'
							}
						]
					}]
				});
			}
//			formatDate(row,column) {
//				const date = new Date(parseInt(row.startWorkTime, 0));
//				return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
//			},
		},

		mounted() {
//			this.addrecord = newProject.listRecord;
			this.loading = true;
			this.$http(`/project/detail?id=${this.$route.params.id}`).then((response) => {
				this.itemInfo = response.data.data;
				this.apps();
				this.loading = false;
			}).catch((error) => {
				this.loading = false;
			});
			this.getrecordList();
		},
	};
</script>
<style lang="scss" scoped>
	#itemShow {
		.addrecord {
			width: 100%;
			height: 100%;
			padding: 10px;
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			.names_input {
				width: 60%;
				height: 40px;
				padding: 10px 0 10px 100px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				span {
					width: 100px;
					height: 40px;
					display: inline-block;
					text-align: center;
					line-height: 40px;
				}
				.padd_right {
					width: 100px;
					height: 40px;
					display: inline-block;
					text-align: center;
					line-height: 40px;
				}
			}
			.addtimerecord {
				width: 30%;
				height: 40px;
				padding: 10px 0 10px 100px;
				text-align: center;
				line-height: 40px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				span {
					width: 120px;
					height: 40px;
				}
			}
		}
		.deaital {
			text-align: center;
		}
		#fullName_input {
			width: 300px;
			height: 60px;
			margin-right: 30px;
		}
		#payCircle {
			width: 900px;
			height: 300px;
			/*padding: 0 0 50px 0;*/
			display: flex;
			justify-content: space-around;
			align-items: center;
			#chartone {
				width: 300px;
				height: 300px;
			}
			#charttwo {
				width: 300px;
				height: 300px;
			}
			#chartthree {
				width: 300px;
				height: 300px;
			}
		}
		#chartdeaital {
			width: 900px;
			height: 60px;
			padding-bottom: 30px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			div {
				margin-left: 16px;
				width: 400px;
				height: 60px;
				text-align: center;
				font-size: 12px;
				span:nth-of-type(2) {
					width: 100%;
					height: 40px;
					color: orangered;
				}
			}
			div:nth-of-type(2) {
				margin-left: 2px;
			}
			div:nth-of-type(3) {
				margin-left: 10px;
			}
		}
		#gangwei {
			margin-right: 30px;
		}
		#upRetained {
			width: 100%;
			height: 100%;
			margin-bottom: 20px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			span {
				width: 160px;
				height: 100%;
			}
		}
		#itemPayinit {
			align-items: center;
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: flex-start;
			.block {
				margin-right: 30px;
			}
		}
		#groupsDialog {
			width: 1200px;
			height: 1000px;
			.container {
				width: 1000px;
				height: 100%;
				margin: 0 auto;
				background: yellow;
			}
		}
		.fullGroups {
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
		.fullprovide {
			width: 100%;
			height: 60px;
			padding-top: 14px;
			padding-bottom: 10px;
			display: flex;
			justify-content: flex-start;
		}
		#search_find {
			/*width: 100px;*/
			height: 38px;
		}
		.worker_change {
			width: 100%;
			height: 40px;
			margin: 30px 0px 20px 0;
			.mar_right {
				margin: 0 50px 0 50px;
			}
		}
		.marChange {
			margin-left: 30px;
		}
		.search_back {
			padding-bottom: 20px;
			text-indent: 30px;
			line-height: 60px;
			margin-top: 20px;
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: flex-start;
			div:nth-of-type(2) {
				width: 460px;
				height: 100%;
				.idcard_input {
					line-height: 60px;
					width: 300px;
				}
			}
			div:nth-of-type(1) {
				width: 300px;
				height: 100%;
				.name_input {
					line-height: 60px;
					width: 200px;
				}
			}
			.search_button {
				height: 40px;
				margin-top: 10px;
			}
		}
		.tips {
			border-bottom: 1px solid #bcc4d6;
		}
	}
</style>