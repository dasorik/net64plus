﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Hazel.Udp
{
    /// <summary>
    ///     Extra internal states for SendOption enumeration when using UDP.
    /// </summary>
    enum UdpSendOption : byte
    {
        /// <summary>
        ///     Hello message for initiating communication.
        /// </summary>
        Hello = 8,

        /// <summary>
        ///     Message for discontinuing communication.
        /// </summary>
        Disconnect = 9,

        /// <summary>
        ///     Message acknowledging the receipt of a message.
        /// </summary>
        Acknowledgement = 10,

        /// <summary>
        ///     Message that is part of a larger, fragmented message.
        /// </summary>
        Fragment = 11
    }
}
