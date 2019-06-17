
package sharedutils

import (
    "log"
    "net"
    "syscall"
	"os"
    "golang.org/x/net/ipv4"
)

type iphdr struct {
    vhl   uint8
    tos   uint8
    iplen uint16
    id    uint16
    off   uint16
    ttl   uint8
    proto uint8
    csum  uint16
    src   [4]byte
    dst   [4]byte
}

type serveIfConn struct {
	ifIndex int
	conn    *ipv4.PacketConn
	cm      *ipv4.ControlMessage
}

// ServeConn is the bare minimum connection functions required by Serve()
// It allows you to create custom connections for greater control,
// such as ServeIfConn (see serverif.go), which locks to a given interface.
type ServeConn interface {
	ReadFrom(b []byte) (n int, addr net.Addr, err error)
	WriteTo(b []byte, addr net.Addr) (n int, err error)
	ReadFromRaw(b []byte) (n int, cm *ipv4.ControlMessage, addr net.Addr, err error)
}

func (s *serveIfConn) ReadFrom(b []byte) (n int, addr net.Addr, err error) {
	n, s.cm, addr, err = s.conn.ReadFrom(b)
	return
}

func (s *serveIfConn) ReadFromRaw(b []byte) (n int, cm *ipv4.ControlMessage, addr net.Addr, err error) {
	n, cm, addr, err = s.conn.ReadFrom(b)
	return
}

func (s *serveIfConn) WriteTo(b []byte, addr net.Addr) (n int, err error) {

	// ipv4 docs state that Src is "specify only", however testing by tfheen
	// shows that Src IS populated.  Therefore, to reuse the control message,
	// we set Src to nil to avoid the error "write udp4: invalid argument"

	return s.conn.WriteTo(b, s.cm, addr)
}

func Pingraw(srcIP net.IP, dstIP net.IP, ifname string) *serveIfConn {
    var err error
    s, _ := syscall.Socket(syscall.AF_INET, syscall.SOCK_RAW, syscall.IPPROTO_RAW)
    addr := syscall.SockaddrInet4{
        Port: 0,
    }

    copy(addr.Addr[:], dstIP.To4())

    if err = syscall.SetsockoptInt(s, syscall.SOL_SOCKET, syscall.SO_REUSEADDR, 1); err != nil {
      log.Fatal(err)
    }

    if err = syscall.SetsockoptString(s, syscall.SOL_SOCKET, syscall.SO_BINDTODEVICE, ifname); err != nil {
      log.Fatal(err)
    }

    // packet := pkt(dstIP, srcIP)
    f := os.NewFile(uintptr(s), "")
    c, err := net.FilePacketConn(f)
    f.Close()
    if err != nil {
      log.Fatal(err)
    }
    p := ipv4.NewPacketConn(c)
    // i := ipv4.NewControlMessage(c)
    iface, err := net.InterfaceByName(ifname)


    return &serveIfConn{ifIndex: iface.Index, conn: p}
    // p.SetDeadline(t)
    // err = syscall.Sendto(fd, packet, 0, &addr)
    // if err != nil {
    //     log.Fatal("Sendto:", err)
    // }
}

func pkt(dstIP net.IP, srcIP net.IP) []byte {
    h := ipv4.Header{
        Version:  4,
        Len:      20,
        TotalLen: 20 + 10, // 20 bytes for IP, 10 for ICMP
        TTL:      64,
        Protocol: 1, // ICMP
        Dst:      net.IPv4(127, 0, 0, 1),
        // ID, Src and Checksum will be set for us by the kernel
    }

    icmp := []byte{
        8, // type: echo request
        0, // code: not used by echo request
        0, // checksum (16 bit), we fill in below
        0,
        0, // identifier (16 bit). zero allowed.
        0,
        0, // sequence number (16 bit). zero allowed.
        0,
        0xC0, // Optional data. ping puts time packet sent here
        0xDE,
    }
    cs := csum(icmp)
    icmp[2] = byte(cs)
    icmp[3] = byte(cs >> 8)

    out, err := h.Marshal()
    if err != nil {
        log.Fatal(err)
    }
    return append(out, icmp...)
}

func csum(b []byte) uint16 {
    var s uint32
    for i := 0; i < len(b); i += 2 {
        s += uint32(b[i+1])<<8 | uint32(b[i])
    }
    // add back the carry
    s = s>>16 + s&0xffff
    s = s + s>>16
    return uint16(^s)
}
