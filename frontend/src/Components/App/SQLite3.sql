-- SQLite
SELECT count(id)
FROM backend_lastnamelook;

with max as (

create table t


create table t (
id integer not NULL,
maxRange integer not null
)

insert into t
select id,
       sum(recentCount) over (order by rank) as maxRange
from backend_lastnamelook 

select * from t

)

select * from  backend_lastnamelook
where 17529612 BETWEEN minRange and maxRange 



inner join  
 t
on backend_lastnamelook.id = t.id
set backend_lastnamelook.maxRange= t.maxRange


update backend_lastnamelook 
inner JOIN (
select id,
       sum(recentCount) over (order by rank desc) as s
from backend_lastnamelook
) as max
on backend_lastnamelook.id = max.id
set maxRange = max.s









update backend_lastnamelook
inner JOIN
select id,
       rank,
       recentCount,
       sum(recentCount) over (order by rank) as s
from backend_lastnamelook as max 
on backend_lastnamelook = max.id
set maxRange = max.s

REPLACE into backend_firstnamelook (
givenName, gender, recentCount,rank, minRange, maxRange)
select src.givenName, src.gender, src.recentCount, src.rank,0 as minRange,
 sum(src.recentCount) over (order by src.rank) as maxRange
 from backend_firstnamelook src
 INNER JOIN backend_firstnamelook dest
 on dest.id = src.id

 update backend_firstnamelook
 set minRange = maxRange-recentCount


 REPLACE into backend_lastnamelook (
surName, recentCount,rank, minRange, maxRange)
select src.surName, src.recentCount, src.rank,0 as minRange,
 sum(src.recentCount) over (order by src.rank) as maxRange
 from backend_lastnamelook src
 INNER JOIN backend_lastnamelook dest
 on dest.id = src.id

 update backend_lastnamelook
 set minRange = maxRange-recentCount

 select givenName,gender,minRange, maxRange from backend_firstnamelook

 select count(gender), gender from backend_firstnamelook
 group by gender



