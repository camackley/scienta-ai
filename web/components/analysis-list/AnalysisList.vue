<template>
  <div class="analysis-list container">
    <p class="analysis-list--title row">Your last analysis</p>
    
    <div class="analysis-list__list row">
      <div class="card col-6 shadow-sm">
        <div class="card-body row g-0">
          <div class="col-md-6">
            <h5 class="card-title">Analysis name</h5>
            <p class="card-date">Date</p>
          </div>
          <div class="col-md-6 btn-group card-actions" role="group" aria-label="Analysis actions">
            <button type="button" class="btn btn-outline-primary">See</button>
            <button type="button" class="btn btn-outline-primary">Download</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./AnalysisList.ts' lang='ts'></script>
<style src='./AnalysisList.scss' lang='scss' scoped></style>
