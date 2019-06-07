package pool

import (
	"context"
	"database/sql"
	"fmt"
	"sync"
)

const FreeMac = "00:00:00:00:00:00"
const FakeMac = "ff:ff:ff:ff:ff:ff"

// Random ip constant
const Random = 1

// OldestReleased ip constant
const OldestReleased = 2

type PoolBackend interface {
	NewDHCPPool(capacity uint64, algorithm int)
	ReserveIPIndex(index uint64, mac string) (error, string)
	IsFreeIPAtIndex(index uint64) bool
	GetMACIndex(index uint64) (uint64, string, error)
	GetFreeIPIndex(mac string) (uint64, string, error)
	IndexInPool(index uint64) bool
	FreeIPsRemaining() uint64
	FreeIPIndex(index uint64) error
	Capacity() uint64
	GetDHCPPool() DHCPPool
	GetIssues(macs []string) ([]string, map[uint64]string)
	Listen() bool
}

type PoolCreater func(uint64, string, int, *sql.DB, *context.Context) (PoolBackend, error)

var poolLookup = map[string]PoolCreater{
	"memory": NewMemoryPool,
	"mysql":  NewMysqlPool,
}

func CreatePool(poolType string, capacity uint64, name string, algorithm int, sql *sql.DB, ctx *context.Context) (PoolBackend, error) {
	if creater, found := poolLookup[poolType]; found {
		return creater(capacity, name, algorithm, sql, ctx)
	}

	return nil, fmt.Errorf("Pool of %s not found", poolType)
}

type DHCPPool struct {
	lock      *sync.RWMutex
	free      map[uint64]bool
	mac       map[uint64]string
	capacity  uint64
	released  map[uint64]int64
	algorithm int
	ctx       context.Context
}
