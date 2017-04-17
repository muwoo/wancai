<template>
	<div id="itemShow">
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
					<h3 class="tips">班组管理</h3>
<!---------班组管理------------>
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
					
					<div class="fullGroups" >
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
			<el-tab-pane label="考情管理" name="fifth">
				<div class="block">
					<span class="wrapper">
					    <el-button type="primary">添加考勤记录</el-button>
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

						<el-table class="deaital" :data="tableData0" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
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
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
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
							<el-table-column align="center" prop="status" label="状态" width="120">
							</el-table-column>
							<el-table-column align="center" prop="provide" label="操作" width="160">
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
				<div id="payEcharts">

				</div>
				<el-table class="deaital" :data="tableData7" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column align="center" label="时间" width="120" height="60">
						<template scope="scope">{{ scope.row.date }}</template>
					</el-table-column>
					<el-table-column align="center" prop="styles" label="类型" width="120">
					</el-table-column>
					<el-table-column align="center" prop="mouthsalary" label="金额" width="120">
					</el-table-column>

					<el-table-column align="center" prop="provideren" label="操作人" width="160">
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

	export default {
		name: 'itemShow',
		components: {
			userInfo,
		},
		data() {
			return {
				num1: 1,
				num2: 1,
				num3: 1,
				tableData0: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",					
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime:"9:00",
					upbantime:"18:00",
					//工时
					workhousers:"4",
					//件数
					piecework:"56",	
					holidayhousers:"12",
					status: "未清算",
					provide: "修改 删除"
				}],
				tableData1: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",					
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime:"9:00",
					upbantime:"18:00",
					//工时
					workhousers:"4",
					//件数
					piecework:"56",	
					holidayhousers:"12",
					status: "未清算",
					provide: "修改 删除"
				}],
				tableData2: [{
					name: '剑哥哥 ',
					idCard: "640222199005261913",					
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					date: "2017-01-02",
					onbantime:"9:00",
					upbantime:"18:00",
					//工时
					workhousers:"4",
					//件数
					piecework:"56",	
					holidayhousers:"12",
					status: "清算",
					provide: "修改 删除"
				}],
				tableData3: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					employ:"7",
					banday:"9",
					overtime:"4",
					//计件
					piecework:"56",
					alltime:"300",
					//等级津贴
					allowance:"300",
					//管理津贴
					changewance:"500",
					//餐补
					foodcompensate:"400",
					//奖励
					reward:"添加",
					//处罚
					administrative:"添加",
					mouthsalary:"3500",
					hotdaycost:"100",
					//扣款
					withhold:"添加",
					//扣社保
					koushebao:"00",
					//个人税
					selfshui: "00",
					//实发金额
					realitymoney:"5000",
					status: "已发放",
					provide: "发放"
				}],
				tableData4: [{
					name: '王小虎',
					idCard: "640222199005261913",
					date: "17年6月",
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					employ:"7",
					banday:"9",
					overtime:"4",
					//计件
					piecework:"56",
					alltime:"300",
					//等级津贴
					allowance:"300",
					//管理津贴
					changewance:"500",
					//餐补
					foodcompensate:"400",
					//奖励
					reward:"添加",
					//处罚
					administrative:"添加",
					mouthsalary:"3500",
					hotdaycost:"100",
					//扣款
					withhold:"添加",
					//扣社保
					koushebao:"00",
					//个人税
					selfshui: "00",
					//实发金额
					realitymoney:"5000",
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
					workhousers:"4",
					//计件
					piecework:"56",
					//奖励
					reward:"添加",
					//处罚
					administrative:"添加",
					//餐补
					foodcompensate:"400",					
					mouthsalary:"3500",
					//扣款
					withhold:"添加",					
					//实发金额
					realitymoney:"5000",
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
					workhousers:"4",
					//计件
					piecework:"56",
					//奖励
					reward:"添加",
					//处罚
					administrative:"添加",
					//餐补
					foodcompensate:"400",					
					mouthsalary:"3500",
					//扣款
					withhold:"添加",					
					//实发金额
					realitymoney:"5000",
					status: "已发放",
					provide: "发放"
				}],
				tableData7: [{
					date: "17年6月",	
					styles:"增加奖励",
					mouthsalary:"3500",
					provideren: "紫漠大仙"
				},
				{
					date: "17年6月",	
					styles:"增加奖励",
					mouthsalary:"3500",
					provideren: "紫漠大仙"
				}],
				tableData8: [{
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					incometype:"计时",
					acceptprice:"40",
					unclinchprice:"30",
					daysalary:"100",
					//请假单价
					holidayunivalent:"10",
					//超时单价
					overtimeunivalent:"8",
					jijianprice:"4",
					quanqinreward:"80",
					//餐补
					foodcompensate:"80",					
					provide: "修改 操作"
				}],
				tableData9: [{
					quarters: "下沙一号仓",
					quarters2: "分拣员",
					incometype:"计件",
					acceptprice:"40",
					unclinchprice:"30",
					hourssalary:"100",
					jiansalary:"80",
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
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value4: ''
			};

		},
		methods: {
			dialogVisible() {
				const params = {
					
				}
        		this.$router.push({ name: 'itemGroups', params: { id: this.$route.params.id }});
        		console.log(this.$route.params.id);
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
		},
		mounted() {
			this.loading = true;
			this.$http(`/project/detail?id=${this.$route.params.id}`).then((response) => {
				this.itemInfo = response.data.data;
				this.loading = false;
			}).catch((error) => {
				this.loading = false;
			});
		},
	};
</script>
<style lang="scss" scoped>
	#itemShow {
		.deaital {
			text-align: center;
		}
		#fullName_input {
			width: 300px;
			height: 60px;
			margin-right: 30px;
		}
		#payEcharts {
			width: 800px;
			height: 300px;
			padding: 50px 0 50px 0;
			background: green;
		}
		#search_find {
			width: 160px;
			height: 36px;
			margin-right: 30px;
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